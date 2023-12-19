import { Request, Response, } from "express"
import { User } from "../config/entities/user.entity"
import { encrypt } from "../helpers/bcrypt";
import { db } from "../config/db/connection";


export class UsersController {
    async getAllUsers(req: Request, res: Response) {

        try {
            const usuarios: User[] = await User.find({
                select: {
                    id: true,
                    name: true,
                    status: true,
                    lastname: true,
                    age: true,
                    email: true,
                    password: false
                }
            })
            if (usuarios.length === 0) {
                res.status(404).json({
                    msg: `No se encontraron Usuarios`
                })
                return;
            }

            res.status(200).json({
                msg: `getAllUsers`,
                usuarios
            })
        } catch (error) {
            res.status(500).json({
                msg: `Ha ocurrido un error por favor contacte con el administrado`,
                error: `${error}`
            })
        }

    }

    async getOneUser(req: Request, res: Response) {

        const { id } = req.params

        try {

            const usuario = await User.findOne({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    status: true,
                    lastname: true,
                    age: true,
                    email: true,
                    password: false
                }
            })

            if (!usuario) {
                res.status(404).json({
                    msg: `No se encontro usuario con id: ${id}`
                })
                return;
            }

            res.status(200).json({
                msg: `Usuario encontrado`,
                usuario
            })
        } catch (error) {
            res.status(500).json({
                msg: `Ha ocurrido un error por favor contacte con el administrado`,
                error: `${error}`
            })
        }
    }

    async updateUser(req: Request, res: Response) {

        const { body } = req
        const { id } = req.params

        try {

            const usuarioDB = db.getRepository(User)

            const usuario = await usuarioDB.findOne({
                where: {
                    id
                }
            })

            if (!usuario) {
                res.status(404).json({
                    msg: `No se encontro usuario con id: ${id}`
                })
                return;
            }

            const passwordHash = await encrypt(body.password)

            usuarioDB.merge(usuario, body)
            usuarioDB.merge(usuario, { password: passwordHash })

            await usuarioDB.save(usuario);

            res.status(200).json({
                msg: `Usuario actualizado`,
                usuario
            })

        } catch (error) {
            res.status(500).json({
                msg: `Ha ocurrido un error por favor contacte con el administrado`,
                error: `${error}`
            })
        }
    }

    async createUser(req: Request, res: Response) {

        const {
            name,
            lastname,
            age,
            email,
            password
        } = req.body

        try {

            const passwordHash = await encrypt(password)

            const existeUsuario = await User.findOneBy({
                email
            })

            if (existeUsuario) {
                res.json({
                    msg: `Ya existe un usuario registrado con este correo`
                })
                return
            }

            const usuario = User.create({
                name,
                lastname,
                age,
                email,
                password: passwordHash
            })

            await usuario.save()

            res.status(201).json({
                msg: "Usuario Creado",
                usuario
            })


        } catch (error) {
            res.status(500).json({
                msg: `Ha ocurrido un error por favor contacte con el administrado`,
                error: `${error}`
            })
        }
    }

    async deleteUser(req: Request, res: Response) {

        const { id } = req.params

        try {

            const usuarioDB = db.getRepository(User)

            const usuario = await usuarioDB.findOne({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    status: true,
                    lastname: true,
                    age: true,
                    email: true,
                    password: false
                }
            })

            if (!usuario) {
                res.status(404).json({
                    msg: `No se encontro usuario con id: ${id}`
                })
                return;
            }

            if (!usuario.status) {
                usuarioDB.merge(usuario, { status: true })
                await usuarioDB.save(usuario);

                return res.status(200).json({
                    msg: "Estado cambiado a true",
                    usuario
                })
            }

            usuarioDB.merge(usuario, { status: false })

            await usuarioDB.save(usuario);

            res.status(200).json({
                msg: "Estado cambiado a false",
                usuario
            })

        } catch (error) {
            res.status(500).json({
                msg: `Ha ocurrido un error por favor contacte con el administrado`,
                error: `${error}`
            })
        }
    }
}