-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "totalTime" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pizza" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "flavor" TEXT NOT NULL,
    "customizations" TEXT[],
    "preparationTime" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "orderId" TEXT,

    CONSTRAINT "Pizza_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pizza" ADD CONSTRAINT "Pizza_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
