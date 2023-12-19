import { Request, Response, } from "express"


export class UsersController {
    getAllUsers(req: Request, res: Response) {
        res.json({
            msg: `getAllUsers`,
            response: `Todos los Usuarios`
        })
    }

    getOneUser(req: Request, res: Response) {
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