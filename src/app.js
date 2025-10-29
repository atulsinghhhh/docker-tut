import express from 'express'
import userRoutes from './routes/user.route.js'

const app=express();

app.use(express.json());
app.use("/api/user",userRoutes);

// app.use("/",(req,res)=>{
//     res.send(`I learn about docker compose !!`);
// })



export {app}
