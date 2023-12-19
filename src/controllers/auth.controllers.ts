import { Request, Response } from "express";


export class AuthController {

    
    authUser(req: Request, res: Response) {
      

        res.json({
            msg: `AuthUser`
        })
    }
}