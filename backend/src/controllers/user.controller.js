import pool from "../lib/db.js";

export const addUser = async (req, res) => {
    try {
        const {name,email} = req.body;
        console.log("name & email ",name,email);
        
        if(!name || !email){
            return res.status(404).json({
                success: false,
                message: "all fields are required !!"
            });
        }

        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );

        res.status(201).json({
            success: true,
            message: 'Successfully added new user',
            newData: result.rows[0]
        });
    } catch (error) {
        console.log('Error occur during the add new user',error);
        res.status(500).json({
            success: false,
            message: "failed to add new user"
        });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY name desc');
        res.status(200).json({
            success: true,
            user: result.rows
        });
    } catch (error) {
        console.log('Error occur during the that new user',error);
        res.status(500).json({
            success: false,
            message: "failed to fetch new user"
        });
    }
}