import { Router, Request, Response } from 'express';
import { events } from '../models/event';

const router = Router();

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
router.put('/:id', (req: Request, res: Response) => {
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