import "reflect-metadata"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma };