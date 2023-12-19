import { Request, Response, } from "express"
import { User } from "../config/entities/user.entity"
import { encrypt } from "../helpers/bcrypt";
import { db } from '../config/db/connection';


export class UsersController {
    async getAllUsers(req: Request, res: Response) {

        try {
            const usuarios: User[] = await User.find({
                select : {
                    id : true,
                    name: true,
                    status: true,
                    lastname : true,
                    age: true,
                    email : true,
                    password : false
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
                error
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
                select : {
                    id : true,
                    name: true,
                    status: true,
                    lastname : true,
                    age: true,
                    email : true,
                    password : false
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
                error
            })
        }
    }

    updateUser(req: Request, res: Response) {
        res.json({
            msg: `updateUser`,
            response: `usuario actualizado`
        })
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
            console.error(error);
            
            res.status(500).json({
                msg: `Ha ocurrido un error por favor contacte con el administrado`,
                error
            })
        }
    }

    deleteUser(req: Request, res: Response) {
        res.json({
            msg: `getAllUsers`,
            response: `borrando usuario ...`
        })
    }
}