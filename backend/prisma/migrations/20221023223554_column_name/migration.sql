/*
  Warnings:

  - You are about to drop the column `games_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_games_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "games_id",
ADD COLUMN     "game_id" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
