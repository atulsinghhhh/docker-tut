import dotenv from 'dotenv'
import pkg from 'pg'
const { Pool } = pkg

dotenv.config();

const {
    PGHOST = 'db',
    PGPASSWORD,
    PGUSER = 'postgres',
    PGDATABASE = 'mydatabase',
    PGPORT = '5432'
} = process.env

const pool = new Pool({
    host: PGHOST,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    port: parseInt(PGPORT, 10)
})

export const dbConnect = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255)
            );
        `)
        console.log('Postgres database connected and users table created')
    } catch (error) {
        console.error('Postgres database failed to connect to server', error)
    }
}

export default pool

