/*
  Warnings:

  - The primary key for the `Festival` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_festival_id_fkey";

-- DropForeignKey
ALTER TABLE "TotalRate" DROP CONSTRAINT "TotalRate_festival_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRate" DROP CONSTRAINT "UserRate_festival_id_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "festival_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Festival" DROP CONSTRAINT "Festival_pkey",
ALTER COLUMN "festival_id" DROP DEFAULT,
ALTER COLUMN "festival_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Festival_pkey" PRIMARY KEY ("festival_id");
DROP SEQUENCE "Festival_festival_id_seq";

-- AlterTable
ALTER TABLE "TotalRate" ALTER COLUMN "festival_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserRate" ALTER COLUMN "festival_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "UserRate" ADD CONSTRAINT "UserRate_festival_id_fkey" FOREIGN KEY ("festival_id") REFERENCES "Festival"("festival_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TotalRate" ADD CONSTRAINT "TotalRate_festival_id_fkey" FOREIGN KEY ("festival_id") REFERENCES "Festival"("festival_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_festival_id_fkey" FOREIGN KEY ("festival_id") REFERENCES "Festival"("festival_id") ON DELETE RESTRICT ON UPDATE CASCADE;
