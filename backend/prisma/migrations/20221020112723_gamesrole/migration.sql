/*
  Warnings:

  - You are about to drop the column `body` on the `messages` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `game_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('master', 'insider', 'common');

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "body",
ADD COLUMN     "game_id" INTEGER NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "games_id" INTEGER,
ADD COLUMN     "role" "Role",
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "game" TEXT,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_game_key" ON "games"("game");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_games_id_fkey" FOREIGN KEY ("games_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
