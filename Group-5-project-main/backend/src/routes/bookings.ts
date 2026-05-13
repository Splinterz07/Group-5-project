import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { bookings, Booking } from '../models/booking';
import { events } from '../models/event';
import validate from '../middleware/validate';

const router = Router();

// Validation rules
const bookingValidation = [
  body('eventId').notEmpty().withMessage('Event ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('seats').isInt({ min: 1 }).withMessage('Seats must be at least 1'),
];

// GET all bookings
router.get('/', (req: Request, res: Response) => {
  res.json(bookings);
});

// POST create a new booking
router.post('/', bookingValidation, validate, (req: Request, res: Response) => {
  const { eventId, name, email, seats } = req.body;

  const event = events.find(e => e.id === eventId);
  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }

  if (event.availableSeats < seats) {
    res.status(400).json({ message: 'Not enough available seats' });
    return;
  }

  const newBooking: Booking = {
    id: String(bookings.length + 1),
    eventId,
    name,
    email,
    seats,
    createdAt: new Date().toISOString()
  };

  event.availableSeats -= seats;
  bookings.push(newBooking);

  res.status(201).json(newBooking);
});

// DELETE cancel a booking
router.delete('/:id', (req: Request, res: Response) => {
  const index = bookings.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Booking not found' });
    return;
  }

  const booking = bookings[index];
  const event = events.find(e => e.id === booking.eventId);
  if (event) {
    event.availableSeats += booking.seats;
  }

  bookings.splice(index, 1);
  res.json({ message: 'Booking cancelled successfully' });
});

export default router;