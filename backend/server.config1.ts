import { Pool } from "pg";

import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({

    connectionString: process.env.DB_URL

});

export const connectDB = async (): Promise<void> => {

    try {

        await pool.connect();

        console.log("PostgreSQL Connected");

    } catch (error) {

        console.log(error);

    }

}