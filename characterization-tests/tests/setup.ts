import { afterAll } from "vitest";
import { prisma } from "../src/database";

afterAll(async () => {
  await prisma.$disconnect();
});
