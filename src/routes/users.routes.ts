import { Router } from "express";
import { UsersController } from "../controllers/users.controllers";


const router = Router()

router.get('/', (req, res) => new UsersController().getAllUsers(req, res))

export default router