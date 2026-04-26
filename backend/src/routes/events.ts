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

export default router;