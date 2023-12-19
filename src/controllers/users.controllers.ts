import { Request, Response,  } from "express"


export class UsersController {
    getAllUsers(req: Request, res : Response) {
        res.json({
            msg: `hola mundo`
        })
    }
}