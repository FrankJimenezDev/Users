import express, { Application } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import users from "../routes/users.routes"
import auth from "../routes/auth.routes"
import { db }from "../config/db/connection"

class Server {
    private app: Application
    private port: number
    private path = {
        auth : '/api/auth',
        users : '/api/users'
    }
    constructor() {
        this.app = express()
        this.port = Number(process.env.PORT)

        this.middlewares()

        this.dataBase()

        this.routes()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(cookieParser())
        this.app.use(express.json())
    }

    async dataBase() {
        try {
            await db.initialize()
            console.log(`Data Base inicializada`);
        } catch (error) {
            console.error(`Data Base no inicializada`, error);
        }
    }

    routes() {
        this.app.use(this.path.auth, auth)
        this.app.use(this.path.users, users)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running: http://localhost:${this.port}`);
        })
    }
}

export default Server