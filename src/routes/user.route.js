import { Router } from "express";
import { addUser, getAllUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/",addUser);
router.get("/",getAllUser);

export default router;