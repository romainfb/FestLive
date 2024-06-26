-- DropForeignKey
ALTER TABLE "Festival" DROP CONSTRAINT "Festival_category_id_fkey";

-- AlterTable
ALTER TABLE "Festival" ALTER COLUMN "category_id" DROP NOT NULL,
ALTER COLUMN "end_date" DROP NOT NULL,
ALTER COLUMN "start_date" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Festival" ADD CONSTRAINT "Festival_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;
