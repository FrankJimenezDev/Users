import jwt from "jsonwebtoken"
import { User } from "../config/entities/user.entity";

export const generarJWT = (usuario: User) => {

    return new Promise((resolve, reject) => {

        jwt.sign({
            id: usuario.id,
            edad: usuario.age
            },
            process.env.KEY_TOKEN || "",
            {
                expiresIn: '4h'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token')
                } else {
                    resolve(token);
                }
            })
    })
}