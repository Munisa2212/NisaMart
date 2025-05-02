/*
  Warnings:

  - You are about to drop the column `color_id` on the `ProductColor` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `ProductColor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductColor" DROP CONSTRAINT "ProductColor_color_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductColor" DROP CONSTRAINT "ProductColor_product_id_fkey";

-- AlterTable
ALTER TABLE "Color" ADD COLUMN     "productColor_id" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "color_id" TEXT;

-- AlterTable
ALTER TABLE "ProductColor" DROP COLUMN "color_id",
DROP COLUMN "product_id";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "ProductColor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_productColor_id_fkey" FOREIGN KEY ("productColor_id") REFERENCES "ProductColor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
