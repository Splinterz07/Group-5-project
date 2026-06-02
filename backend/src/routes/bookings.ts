import { Router } from 'express';
import { body } from 'express-validator';
import validate from '../middleware/validate';
import authMiddleware from '../middleware/auth';
import { getAllBookings, getMyBookings, createBooking, cancelBooking } from '../controllers/bookingController';

const router = Router();

const bookingValidation = [
  body('eventId').notEmpty().withMessage('Event ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('seats').isInt({ min: 1 }).withMessage('Seats must be at least 1'),
];

router.get('/', getAllBookings);
router.get('/my-bookings', authMiddleware, getMyBookings);
router.post('/', authMiddleware, bookingValidation, validate, createBooking);
router.delete('/:id', authMiddleware, cancelBooking);

export default router;