import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  provider: z.string(),
  providerId: z.string()
}).strict();
export const UserProviderProviderIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.UserProviderProviderIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UserProviderProviderIdCompoundUniqueInput>;
export const UserProviderProviderIdCompoundUniqueInputObjectZodSchema = makeSchema();
