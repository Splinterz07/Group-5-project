// =======================================
// authController.ts
// =======================================

import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { pool } from "../config/db";

export const registerUser = async (

    req: Request,
    res: Response

): Promise<void> => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await pool.query(

            `
            SELECT * FROM users
            WHERE email = $1
            `,

            [email]

        );

        if (existingUser.rows.length > 0) {

            res.status(400).json({
                message: "User Already Exists"
            });

            return;

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(

            `
            INSERT INTO users
            (name, email, password)

            VALUES ($1, $2, $3)
            `,

            [name, email, hashedPassword]

        );

        res.status(201).json({
            message: "Registration Successful"
        });

    } catch (error) {

        res.status(500).json(error);

    }

};

export const loginUser = async (

    req: Request,
    res: Response

): Promise<void> => {

    try {

        const { email, password } = req.body;

        const result = await pool.query(

            `
            SELECT * FROM users
            WHERE email = $1
            `,

            [email]

        );

        if (result.rows.length === 0) {

            res.status(400).json({
                message: "User Not Found"
            });

            return;

        }

        const user = result.rows[0];

        const validPassword = await bcrypt.compare(

            password,
            user.password

        );

        if (!validPassword) {

            res.status(400).json({
                message: "Invalid Password"
            });

            return;

        }

        const token = jwt.sign(

            {
                id: user.id,
                isAdmin: user.is_admin
            },

            process.env.JWT_SECRET as string,

            {
                expiresIn: "7d"
            }

        );

        res.status(200).json({

            token,

            user: {

                id: user.id,
                name: user.name,
                email: user.email

            }

        });

    } catch (error) {

        res.status(500).json(error);

    }

};

// =======================================
// eventController.ts
// =======================================

export const getEvents = async (

    req: Request,
    res: Response

): Promise<void> => {

    try {

        const result = await pool.query(

            `
            SELECT * FROM events
            ORDER BY id DESC
            `

        );

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json(error);

    }

};

export const createEvent = async (

    req: Request,
    res: Response

): Promise<void> => {

    try {

        const {

            name,
            description,
            date,
            time,
            location,
            ticketPrice,
            ticketQuantity,
            banner

        } = req.body;

        const result = await pool.query(

            `
            INSERT INTO events
            (
                name,
                description,
                date,
                time,
                location,
                ticket_price,
                ticket_quantity,
                banner
            )

            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8)

            RETURNING *
            `,

            [
                name,
                description,
                date,
                time,
                location,
                ticketPrice,
                ticketQuantity,
                banner
            ]

        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        res.status(500).json(error);

    }

};

export const deleteEvent = async (

    req: Request,
    res: Response

): Promise<void> => {

    try {

        await pool.query(

            `
            DELETE FROM events
            WHERE id = $1
            `,

            [req.params.id]

        );

        res.status(200).json({
            message: "Event Deleted"
        });

    } catch (error) {

        res.status(500).json(error);

    }

};

// =======================================
// bookingController.ts
// =======================================

export const bookEvent = async (

    req: Request,
    res: Response

): Promise<void> => {

    try {

        const {

            userId,
            eventId,
            quantity

        } = req.body;

        const eventResult = await pool.query(

            `
            SELECT * FROM events
            WHERE id = $1
            `,

            [eventId]

        );

        if (eventResult.rows.length === 0) {

            res.status(404).json({
                message: "Event Not Found"
            });

            return;

        }

        const event = eventResult.rows[0];

        if (event.ticket_quantity < quantity) {

            res.status(400).json({
                message: "Not Enough Tickets"
            });

            return;

        }

        const totalPrice =
            quantity * event.ticket_price;

        const booking = await pool.query(

            `
            INSERT INTO bookings
            (
                user_id,
                event_id,
                quantity,
                total_price
            )

            VALUES ($1,$2,$3,$4)

            RETURNING *
            `,

            [
                userId,
                eventId,
                quantity,
                totalPrice
            ]

        );

        await pool.query(

            `
            UPDATE events

            SET ticket_quantity =
                ticket_quantity - $1

            WHERE id = $2
            `,

            [quantity, eventId]

        );

        res.status(201).json(booking.rows[0]);

    } catch (error) {

        res.status(500).json(error);

    }

};

export const getBookings = async (

    req: Request,
    res: Response

): Promise<void> => {

    try {

        const result = await pool.query(

            `
            SELECT
                bookings.*,
                events.name AS event_name

            FROM bookings

            JOIN events
            ON bookings.event_id = events.id

            WHERE user_id = $1
            `,

            [req.params.userId]

        );

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json(error);

    }

};