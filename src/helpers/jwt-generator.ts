import jwt from "jsonwebtoken"

export const generarJWT = (administrador: any) => {

    return new Promise((resolve, reject) => {

        jwt.sign({
            id: administrador.ID,
            edad: administrador.EDAD,
            role: administrador.ROLE || "admin"
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