import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const route = Router();

route.get("/", async (req, res) => {

    const game = await prisma.games.findMany({
        select: {
            id: true,
            game: true,
            users: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })

    res.json(game)
})

route.get("/:id", async (req, res) => {

    const id = parseInt(req.params.id);

    if (req.user.role == "master" || req.user.role == "insider") {

        const game = await prisma.games.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                game: true,
                users: {
                    select: {
                        id: true,
                        username: true,
                        role:true
                    }
                },
                messages: {
                    select: {
                        id:true,
                        message: true
                    }
                }
            }
        })

        res.json(game)
    }
    else {
        const game = await prisma.games.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                game: true,
                users: {
                    select: {
                        id: true,
                        username: true,
                        role: true
                    }
                },
                messages: {
                    where: {
                        private: false
                    },
                    select: {
                        id: true,
                        message: true,
                    }
                }
            }
        })

        res.json(game)
    }
})

route.post('/', async (req, res) => {
    const game = await prisma.games.create({
        data: {
            game: req.body.game
        }
    })

    res.json(game)
})

route.patch("/:id", async (req, res) => {
    const id = parseInt(req.params.id)

    const activateGame = await prisma.games.update({
        where: {
            id: id
        },
        data: {
            active: req.body.active
        },
        include: {
            users: true,
            messages: true
        }
    })

    if (activateGame.active) {

        const roles = ["master", "insider", "common", "common"]
        roles.sort((a, b) => 0.5 - Math.random())
        console.log(roles)

        activateGame.users.forEach(async (user, index) => {
            await prisma.users.update({
                where: {
                    id: user.id
                },
                data: {
                    role: roles[index]
                }
            })
        });
    }
    else{
        activateGame.users.forEach(async (user) => {
            await prisma.users.update({
                where: {
                    id : user.id
                },
                data: {
                    role: null,

                }
            })  
        })
        activateGame.messages.forEach(async (message) => {
            await prisma.messages.deleteMany({
                where: {
                    id: message.id
                }
            })
        })
    }


    res.sendStatus(200)
})


export default route;