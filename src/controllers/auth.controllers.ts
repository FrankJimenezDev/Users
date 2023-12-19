import { Request, Response } from "express";
import { db } from "../config/db/connection";
import { User } from "../config/entities/user.entity";
import { compare } from "bcryptjs";
import { generarJWT } from "../helpers/jwt-generator";


export class AuthController {


    async authUser(req: Request, res: Response) {
        const { email, password } = req.body
        const userDB = db.getRepository(User)

        try {

            const usuario = await userDB.findOneBy({
                email
            })

            if (!usuario) {
                res.status(404).json({
                    msg: `Usuario o Contraseña invalidos`
                })
                return;
            }

            const checkPassword = await compare(password, usuario.password)

            if (!checkPassword) {
                res.status(404).json({
                    msg: `Usuario o Contraseña invalidos`
                })
                return;
            }

            const token = await generarJWT(usuario)

            res.status(200).json({
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'hubo un error comuniquese con el administrador'
            })
        }
    }
}
