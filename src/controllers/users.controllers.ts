import { Request, Response, } from "express"
import { User } from "../config/entities/user.entity"


export class UsersController {
    async getAllUsers(req: Request, res: Response) {

        try {
            const usuarios: User[] = await User.find()
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
            const usuario = await User.findOneBy({
                id
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

        res.json({
            msg: `getOneUser`,
            response: `obtener usuario`
        })
    }

    updateUser(req: Request, res: Response) {
        res.json({
            msg: `updateUser`,
            response: `usuario actualizado`
        })
    }

    createUser(req: Request, res: Response) {
        res.json({
            msg: `createUser`,
            response: `crear usuario`
        })
    }

    deleteUser(req: Request, res: Response) {
        res.json({
            msg: `getAllUsers`,
            response: `borrando usuario ...`
        })
    }
}