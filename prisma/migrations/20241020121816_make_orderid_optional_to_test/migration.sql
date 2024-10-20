-- DropForeignKey
ALTER TABLE "Pizza" DROP CONSTRAINT "Pizza_orderId_fkey";

-- AlterTable
ALTER TABLE "Pizza" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pizza" ADD CONSTRAINT "Pizza_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
