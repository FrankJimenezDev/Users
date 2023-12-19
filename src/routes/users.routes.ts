import { Router } from "express";
import { UsersController } from "../controllers/users.controllers";


const router = Router()

router.get('/', (req, res) => new UsersController().getAllUsers(req, res))
router.get('/:id', (req, res) => new UsersController().getOneUser(req, res))
router.post('/', (req, res) => new UsersController().createUser(req, res))
router.put('/:id', (req, res) => new UsersController().updateUser(req, res))
router.delete('/:id', (req, res) => new UsersController().deleteUser(req, res))


export default router