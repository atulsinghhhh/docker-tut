import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv'
dotenv.config();

const { PGHOST, PGPASSWORD, PGUSER, PGDATABASE } = process.env
// console.log("pghost: ",PGHOST)
// console.log('password: ',PGPASSWORD)
// console.log('user: ',PGUSER);
// console.log('database: ',PGDATABASE);

export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
)

export const dbConnect = async () => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255)
            )
        `;
        console.log("Neon database connected and users table created");
    } catch (error) {
        console.error("Neon database failed to connect to server", error);
    }
};

