import { Router, Request, Response } from 'express';
import { bookings, Booking } from '../models/booking';
import { events } from '../models/event';

const router = Router();

// GET all bookings
router.get('/', (req: Request, res: Response) => {
  res.json(bookings);
});

// POST create a new booking
router.post('/', (req: Request, res: Response) => {
  const { eventId, name, email, seats } = req.body;

  // Find the event
  const event = events.find(e => e.id === eventId);
  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }

  // Check available seats
  if (event.availableSeats < seats) {
    res.status(400).json({ message: 'Not enough available seats' });
    return;
  }

  // Create booking
  const newBooking: Booking = {
    id: String(bookings.length + 1),
    eventId,
    name,
    email,
    seats,
    createdAt: new Date().toISOString()
  };

  // Update available seats
  event.availableSeats -= seats;
  bookings.push(newBooking);

  res.status(201).json(newBooking);
});

export default router;