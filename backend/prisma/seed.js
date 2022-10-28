import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const seed = async () => {

    await prisma.games.deleteMany();
    await prisma.users.deleteMany();
    await prisma.messages.deleteMany();

    await prisma.games.create({
        data: {
            game: "001"
        }
    })

    await prisma.users.create({
        data:{
            username: "hassan",
            role: "master",
            games_id: 1
        }
    })

    await prisma.users.create({
        data:{
            username: "pavel",
            role: "insider",
            games_id: 1
        }
    })

    await prisma.users.create({
        data:{
            username: "saleh",
            role: "common",
            games_id: 1
        }
    })

    await prisma.users.create({
        data:{
            username: "viktor",
            role: "common",
            games_id: 1
        }
    })

    await prisma.messages.create({
        data: {
            message: "apple",
            private: true,
            game_id: 1
        }
    })

    await prisma.messages.create({
        data:{
            message: "is it food?",
            game_id: 1
        }
    })

    await prisma.messages.create({
        data:{
            message: "frukt??",
            game_id: 1
        }
    })

}

seed()

export default seed;