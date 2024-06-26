/*
  Warnings:

  - Added the required column `datasource` to the `Festival` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Festival" ADD COLUMN     "datasource" TIMESTAMP(3) NOT NULL;
