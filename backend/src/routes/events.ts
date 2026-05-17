import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import validate from '../middleware/validate';
import prisma from '../lib/prisma';

const router = Router();

const eventValidation = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('date').optional().notEmpty().withMessage('Date cannot be empty'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('totalSeats').optional().isInt({ min: 1 }).withMessage('Total seats must be at least 1'),
];

// GET all events
router.get('/', async (req: Request, res: Response) => {
  const events = await prisma.event.findMany();
  res.json(events);
});

// GET single event by id
router.get('/:id', async (req: Request, res: Response) => {
  const event = await prisma.event.findUnique({
    where: { id: Number(req.params.id) }
  });
  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }
  res.json(event);
});

// POST create a new event
router.post('/', async (req: Request, res: Response) => {
  const { title, description, date, location, totalSeats, price } = req.body;

  const event = await prisma.event.create({
    data: {
      title,
      description,
      date,
      location,
      totalSeats,
      availableSeats: totalSeats,
      price
    }
  });

  res.status(201).json(event);
});

// PUT update an event
router.put('/:id', eventValidation, validate, async (req: Request, res: Response) => {
  const { title, description, date, location, totalSeats, availableSeats, price } = req.body;

  const event = await prisma.event.update({
    where: { id: Number(req.params.id) },
    data: { title, description, date, location, totalSeats, availableSeats, price }
  });

  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }
  res.json(event);
});

export default router;