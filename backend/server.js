import express from "express";
import userRoutes from './routes/userRoutes.js'
import gameRoutes from './routes/gamesRoutes.js'
import messageRoutes from './routes/messagesRoutes.js'
import passport from "passport";
import passConfig from "./passport/passConfig.js";
import session from "express-session";
import { PrismaClient } from "@prisma/client";
import cors from 'cors'

const prisma = new PrismaClient();

const server = express();
const PORT = 5000;

//------------------------------END OF IMPORTS------------------------
//MIDDLEWARE
server.use(express.json())

server.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

server.use(session({
    secret: "hassan",
    resave: false,
    saveUninitialized: false
}))

passConfig(passport
    , username => prisma.users.findUnique({
        where: {
            username: username
        }
    })
)

server.use(passport.initialize())
server.use(passport.session())

//--------------------------------End of Middleware----------------------//

//ROUTES
server.post("/login", passport.authenticate('local', {}), (req, res) => { res.sendStatus(200) })

const isAuthenticated = (req, res, next) => {
    req.isAuthenticated() ? next() : res.sendStatus(401);
}

server.use("/api/users", userRoutes)

server.use("/api/messages", messageRoutes)

server.use("/api/games", isAuthenticated, gameRoutes)

server.get("/user", (req, res) => {
    res.send(req.user)
})

server.get('/', (req, res) => res.json({ message: "hello Insider" }))

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))