import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validate from '../middleware/validate';
import prisma from '../lib/prisma';

const router = Router();

const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// POST /api/auth/register
router.post('/register', registerValidation, validate, async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    res.status(201).json({ message: 'Account created successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// POST /api/auth/login
router.post('/login', loginValidation, validate, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.json({ token, userId: user.id, name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login' });
  }
});

export default router;