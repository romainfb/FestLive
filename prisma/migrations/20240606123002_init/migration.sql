-- CreateTable
CREATE TABLE "SubCategory" (
    "sub_category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("sub_category_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sub_category_id" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Festival" (
    "festival_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "website_url" TEXT,
    "category_id" INTEGER NOT NULL,
    "region" TEXT,
    "department" TEXT,
    "city" TEXT,
    "postal_code" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "street" TEXT,
    "street_nb" TEXT,

    CONSTRAINT "Festival_pkey" PRIMARY KEY ("festival_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserRate" (
    "user_rate_id" SERIAL NOT NULL,
    "festival_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,

    CONSTRAINT "UserRate_pkey" PRIMARY KEY ("user_rate_id")
);

-- CreateTable
CREATE TABLE "TotalRate" (
    "total_rate_id" SERIAL NOT NULL,
    "festival_id" INTEGER NOT NULL,
    "total_rate" INTEGER,
    "total_reviews" INTEGER,

    CONSTRAINT "TotalRate_pkey" PRIMARY KEY ("total_rate_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "comment_id" SERIAL NOT NULL,
    "festival_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateIndex
CREATE INDEX "Category_sub_category_id_idx" ON "Category"("sub_category_id");

-- CreateIndex
CREATE INDEX "Festival_category_id_idx" ON "Festival"("category_id");

-- CreateIndex
CREATE INDEX "UserRate_festival_id_idx" ON "UserRate"("festival_id");

-- CreateIndex
CREATE INDEX "UserRate_user_id_idx" ON "UserRate"("user_id");

-- CreateIndex
CREATE INDEX "TotalRate_festival_id_idx" ON "TotalRate"("festival_id");

-- CreateIndex
CREATE INDEX "Comment_festival_id_idx" ON "Comment"("festival_id");

-- CreateIndex
CREATE INDEX "Comment_user_id_idx" ON "Comment"("user_id");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "SubCategory"("sub_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Festival" ADD CONSTRAINT "Festival_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRate" ADD CONSTRAINT "UserRate_festival_id_fkey" FOREIGN KEY ("festival_id") REFERENCES "Festival"("festival_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRate" ADD CONSTRAINT "UserRate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TotalRate" ADD CONSTRAINT "TotalRate_festival_id_fkey" FOREIGN KEY ("festival_id") REFERENCES "Festival"("festival_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_festival_id_fkey" FOREIGN KEY ("festival_id") REFERENCES "Festival"("festival_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
