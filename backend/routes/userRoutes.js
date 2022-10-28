import express from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const route = express.Router();

route.get("/", async (req, res) => {

    const users =await prisma.users.findMany({
        select:{
            username: true,
            role: true,
            game_id: true
        }
    })

    res.json(users)
})

route.get("/:id", async (req, res) => {

    const id = parseInt(req.params.id)

    const user = await prisma.users.findUnique({
        where:{
            id: id,
        }
    })

    if(user.role === "common"){
        const messages = await prisma.messages.findMany({
            where: {
                private: false
            },
            select:{
                message: true,
                game_id: true
            }
        })

        res.json({user, messages})
    }

    else{
        const messages = await prisma.messages.findMany({
            select:{
                message: true,
                game_id: true
            }
        })

        res.json({user, messages})
    }
})

route.post("/", async (req, res) => {
    const user = await prisma.users.create({
        data:{
            username: req.body.username,
            password: req.body.password
        }
    })

    res.json(user)
})

route.patch("/:id", async (req, res) => {
    const id = parseInt(req.params.id)

    const user = await prisma.users.update({
        where:{
            id: id
        },
        data: {
            games_id: req.body.games_id
        }
    })

    res.json(user)
})


export default route;