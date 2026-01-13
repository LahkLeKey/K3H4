import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  userId: z.string(),
  name: z.string()
}).strict();
export const PosStoreUserIdNameCompoundUniqueInputObjectSchema: z.ZodType<Prisma.PosStoreUserIdNameCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUserIdNameCompoundUniqueInput>;
export const PosStoreUserIdNameCompoundUniqueInputObjectZodSchema = makeSchema();
