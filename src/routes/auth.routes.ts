import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";


const router = Router()

router.post('/', (req, res) => new AuthController().authUser(req, res))
router.post('/logout', (req, res) => new AuthController().logoutUser(req, res))



export default router