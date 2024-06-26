-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_sub_category_id_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "sub_category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "SubCategory"("sub_category_id") ON DELETE SET NULL ON UPDATE CASCADE;
