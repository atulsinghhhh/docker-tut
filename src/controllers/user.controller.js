import { sql } from "../lib/db.js";

export const addUser = async(req,res)=>{
    try {
        const {name,email} = req.body;
        console.log("name & email ",name,email);
        
        if(!name || !email){
            return res.status(404).json({
                success: false,
                message: "all fields are required !!"
            });
        }

        const newData=await sql`
            INSERT INTO users (name,email)
            VALUES (${name},${email})
            RETURNING *
        `
        res.status(201).json({
            success: true,
            message: 'Successfully Updated new Data',
            newData
        })
    } catch (error) {
        console.log('Error occur during the add new user',error);
        res.status(500).json({
            success: false,
            message: "failed to add new user"
        });
    }
}

export const getAllUser= async(req,res)=>{
    try {
        const user=await sql`
            SELECT * FROM users
            ORDER BY name desc 
        `
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log('Error occur during the that new user',error);
        res.status(500).json({
            success: false,
            message: "failed to fetch new user"
        });
    }
}