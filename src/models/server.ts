import express, { Application } from "express"

class Server {
    private app: Application
    private port: number
    constructor() {
        this.app = express()
        this.port = Number(process.env.PORT)

        this.middlewares()
    }

    middlewares() {
        this.app.use(express.json())
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running: http://localhost:${this.port}`);
        })
    }
}

export default Server