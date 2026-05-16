import { Router, Request, Response } from 'express';
import { events } from '../models/event';
import { body } from 'express-validator';
import validate from '../middleware/validate';

const router = Router();

const eventValidation = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('date').optional().notEmpty().withMessage('Date cannot be empty'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('totalSeats').optional().isInt({ min: 1 }).withMessage('Total seats must be at least 1'),
];

// GET all events
router.get('/', (req: Request, res: Response) => {
  res.json(events);
});

// GET single event by id
router.get('/:id', (req: Request, res: Response) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }
  res.json(event);
});

// PUT update an event
router.put('/:id', eventValidation, validate, (req: Request, res: Response) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }

  const { title, description, date, location, totalSeats, availableSeats, price } = req.body;

  if (title) event.title = title;
  if (description) event.description = description;
  if (date) event.date = date;
  if (location) event.location = location;
  if (totalSeats) event.totalSeats = totalSeats;
  if (availableSeats) event.availableSeats = availableSeats;
  if (price) event.price = price;

  res.json(event);
});

export default router;