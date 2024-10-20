-- CreateTable
CREATE TABLE "Pizza" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "flavor" TEXT NOT NULL,
    "customizations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "value" DOUBLE PRECISION NOT NULL,
    "preparationTime" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "Pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "totalTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pizza" ADD CONSTRAINT "Pizza_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
