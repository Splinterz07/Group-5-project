import { Router, Response } from 'express';
import { body } from 'express-validator';
import validate from '../middleware/validate';
import authMiddleware, { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = Router();

const bookingValidation = [
  body('eventId').notEmpty().withMessage('Event ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('seats').isInt({ min: 1 }).withMessage('Seats must be at least 1'),
];

// GET all bookings
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// POST create a new booking
router.post('/', authMiddleware, bookingValidation, validate, async (req: AuthRequest, res: Response) => {
  try {
    const { eventId, name, email, seats } = req.body;

    const event = await prisma.event.findUnique({
      where: { id: Number(eventId) }
    });

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    if (event.availableSeats < Number(seats)) {
      res.status(400).json({ message: 'Not enough available seats' });
      return;
    }

    const booking = await prisma.booking.create({
      data: { eventId: Number(eventId), name, email, seats: Number(seats), userId: req.userId }
    });

    await prisma.event.update({
      where: { id: Number(eventId) },
      data: { availableSeats: event.availableSeats - Number(seats) }
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking' });
  }
});

// DELETE cancel a booking
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel booking' });
  }
});

export default router;