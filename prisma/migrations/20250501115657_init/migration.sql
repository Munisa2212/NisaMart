/*
  Warnings:

  - You are about to drop the column `color` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Color" ADD COLUMN     "order_id" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "color";

-- DropEnum
DROP TYPE "OrderColor";

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
