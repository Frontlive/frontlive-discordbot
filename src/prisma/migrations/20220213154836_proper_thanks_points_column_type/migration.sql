/*
  Warnings:

  - Changed the type of `thanksPoints` on the `Stats` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Stats" DROP COLUMN "thanksPoints",
ADD COLUMN     "thanksPoints" INTEGER NOT NULL;
