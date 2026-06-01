import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch event' });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, location, totalSeats, price } = req.body;
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date,
        location,
        totalSeats: Number(totalSeats),
        availableSeats: Number(totalSeats),
        price: Number(price)
      }
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, location, totalSeats, availableSeats, price } = req.body;
    const event = await prisma.event.update({
      where: { id: Number(req.params.id) },
      data: { title, description, date, location, totalSeats, availableSeats, price }
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    await prisma.event.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event' });
  }
};