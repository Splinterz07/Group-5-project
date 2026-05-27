import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import validate from '../middleware/validate';
import prisma from '../lib/prisma';

const router = Router();

const eventValidation = [
  body('title').notEmpty().withMessage('Title cannot be empty'),
  body('date').notEmpty().withMessage('Date cannot be empty'),
  body('location').notEmpty().withMessage('Location cannot be empty'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('totalSeats').isInt({ min: 1 }).withMessage('Total seats must be at least 1'),
];

// GET all events
router.get('/', async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// GET single event by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch event' });
  }
});

// POST create a new event
router.post('/', eventValidation, validate, async (req: Request, res: Response) => {
  try {
    const { title, description, date, location, totalSeats, price } = req.body;
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date,
        location,
        totalSeats: Number(totalSeats),
        availableSeats: Number(totalSeats),
        price: Number(price)
      }
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// PUT update an event
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, date, location, totalSeats, availableSeats, price } = req.body;
    const event = await prisma.event.update({
      where: { id: Number(req.params.id) },
      data: { title, description, date, location, totalSeats, availableSeats, price }
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event' });
  }
});

export default router;