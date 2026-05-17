import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import validate from '../middleware/validate';
import prisma from '../lib/prisma';

const router = Router();

const bookingValidation = [
  body('eventId').notEmpty().withMessage('Event ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('seats').isInt({ min: 1 }).withMessage('Seats must be at least 1'),
];

// GET all bookings
router.get('/', async (req: Request, res: Response) => {
  const bookings = await prisma.booking.findMany();
  res.json(bookings);
});

// POST create a new booking
router.post('/', bookingValidation, validate, async (req: Request, res: Response) => {
  const { eventId, name, email, seats } = req.body;

  const event = await prisma.event.findUnique({
    where: { id: Number(eventId) }
  });

  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }

  if (event.availableSeats < seats) {
    res.status(400).json({ message: 'Not enough available seats' });
    return;
  }

  const booking = await prisma.booking.create({
    data: { eventId: Number(eventId), name, email, seats: Number(seats) }

  });

  await prisma.event.update({
    where: { id: Number(eventId) },
    data: { availableSeats: event.availableSeats - seats }
  });

  res.status(201).json(booking);
});

// DELETE cancel a booking
router.delete('/:id', async (req: Request, res: Response) => {
  const booking = await prisma.booking.findUnique({
    where: { id: Number(req.params.id) }
  });

  if (!booking) {
    res.status(404).json({ message: 'Booking not found' });
    return;
  }

  await prisma.event.update({
    where: { id: booking.eventId },
    data: { availableSeats: { increment: booking.seats } }
  });

  await prisma.booking.delete({
    where: { id: Number(req.params.id) }
  });

  res.json({ message: 'Booking cancelled successfully' });
});

export default router;