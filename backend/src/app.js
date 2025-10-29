import express from 'express'
import userRoutes from './routes/user.route.js'
import cors from 'cors'

const app=express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use("/api/user",userRoutes);

// app.use("/",(req,res)=>{
//     res.send(`I learn about docker compose !!`);
// })



export {app}
