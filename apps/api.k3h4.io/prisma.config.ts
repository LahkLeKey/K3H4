import * as dotenv from "dotenv";
import { defineConfig } from "@prisma/config";

dotenv.config();

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is required in environment");
}

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url,
  },
});
