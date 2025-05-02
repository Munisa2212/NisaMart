/*
  Warnings:

  - You are about to drop the column `orderId` on the `Color` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[color_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Color" DROP CONSTRAINT "Color_orderId_fkey";

-- AlterTable
ALTER TABLE "Color" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "color_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_color_id_key" ON "Order"("color_id");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;
