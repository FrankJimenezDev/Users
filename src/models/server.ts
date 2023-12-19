import express, { Application } from "express"

class Server {
    private app: Application
    private port: number
    constructor() {
        this.app = express()
        this.port = Number(process.env.PORT)
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running: http://localhost:${this.port}`);
        })
    }
}

export default Server