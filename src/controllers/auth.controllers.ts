import { Request, Response } from "express";
import jwt from "jsonwebtoken"

import { db } from "../config/db/connection";
import { User } from "../config/entities/user.entity";
import { compare } from "bcryptjs";
import { generarJWT } from "../helpers/jwt-generator";
import { KafkaProducer } from "../config/kafka/producer.config";


export class AuthController {

    async authUser(req: Request, res: Response) {
        const { email, password } = req.body
        const userDB = db.getRepository(User)

        try {

            const usuario = await userDB.findOne({
                where: {
                    email
                }
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

            const kafkaMessage = await userDB.findOne({
                where: {
                    email
                },
                select: {
                    id: true,
                    email: true,
                    status: true
                }
            })

            const kafkaProducer = new KafkaProducer(['localhost:9092'], 'MyKafkaIdClient');

            const runProducer = async () => {
                try {
                    await kafkaProducer.connect();
                    await kafkaProducer.sendMessage('test', 'logIn', JSON.stringify(kafkaMessage));
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    await kafkaProducer.disconnect();
                }
            };

            // Ejecuta el productor
            runProducer();

            const token = await generarJWT(usuario)

            res.cookie('token', token)
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

    async logoutUser(req: Request, res: Response) {

        const token = req.cookies['token']

        const secreto = 'Pr0j3kt0Fr4nc08'

        const payload : any = jwt.verify(token, secreto);

        const email = payload.email
        

        // const userDB = db.getRepository(User)

        try {

            const kafkaMessage = {
                email,
                fecha: new Date()
            };

            // Puedes agregar lógica adicional aquí según tus requisitos
            // Por ejemplo, puedes invalidar el token, limpiar la sesión, etc.

            // Enviar un mensaje de cierre de sesión a Kafka si es necesario
            const kafkaProducer = new KafkaProducer(['localhost:9092'], 'MyKafkaIdClient');
            const runProducer = async () => {
                try {
                    await kafkaProducer.connect();
                    // Puedes enviar un mensaje específico para indicar el cierre de sesión
                    await kafkaProducer.sendMessage('test', 'logOut', JSON.stringify(kafkaMessage));
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    await kafkaProducer.disconnect();
                }
            };

            // Ejecuta el productor
            runProducer();

            // Limpiar la cookie de token
            res.clearCookie('token');

            res.status(200).json({
                msg: 'Sesión cerrada exitosamente',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: 'Hubo un error. Comuníquese con el administrador',
            });
        }
    }
}
