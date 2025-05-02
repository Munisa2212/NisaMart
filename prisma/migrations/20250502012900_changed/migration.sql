/*
  Warnings:

  - You are about to drop the column `productColor_id` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `color_id` on the `Product` table. All the data in the column will be lost.
  - Added the required column `color_id` to the `ProductColor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `ProductColor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Color" DROP CONSTRAINT "Color_productColor_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_color_id_fkey";

-- AlterTable
ALTER TABLE "Color" DROP COLUMN "productColor_id";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "color_id",
ALTER COLUMN "category_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductColor" ADD COLUMN     "color_id" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductColor" ADD CONSTRAINT "ProductColor_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductColor" ADD CONSTRAINT "ProductColor_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
