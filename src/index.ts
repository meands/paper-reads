// const { PrismaClient } = require("@prisma/client");
// TODO: fix esm
import { PrismaClient } from "@prisma/client";

interface CustomNodeJsGlobal {
  prisma: PrismaClient;
}
declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

global.prisma = prisma;

export default prisma;
