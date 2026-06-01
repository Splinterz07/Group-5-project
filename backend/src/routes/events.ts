import { Router } from 'express';
import { body } from 'express-validator';
import validate from '../middleware/validate';
import authMiddleware from '../middleware/auth';
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventController';

const router = Router();

const eventValidation = [
  body('title').notEmpty().withMessage('Title cannot be empty'),
  body('date').notEmpty().withMessage('Date cannot be empty'),
  body('location').notEmpty().withMessage('Location cannot be empty'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('totalSeats').isInt({ min: 1 }).withMessage('Total seats must be at least 1'),
];

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', authMiddleware, eventValidation, validate, createEvent);
router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

export default router;