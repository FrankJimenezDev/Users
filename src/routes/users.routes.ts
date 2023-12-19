import { Router } from "express";
import { UsersController } from "../controllers/users.controllers";
import { validarJWT } from "../middlewares/validar-jwt";


const router = Router()

router.get('/', validarJWT,
(req, res) => new UsersController().getAllUsers(req, res))

router.get('/:id', validarJWT,
(req, res) => new UsersController().getOneUser(req, res))

router.post('/', validarJWT,
(req, res) => new UsersController().createUser(req, res))

router.put('/:id', validarJWT,
(req, res) => new UsersController().updateUser(req, res))

router.delete('/:id', validarJWT,
(req, res) => new UsersController().deleteUser(req, res))


export default router