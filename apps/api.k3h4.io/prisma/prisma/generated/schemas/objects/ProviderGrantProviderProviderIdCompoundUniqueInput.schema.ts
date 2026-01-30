import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  provider: z.string(),
  providerId: z.string()
}).strict();
export const ProviderGrantProviderProviderIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ProviderGrantProviderProviderIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantProviderProviderIdCompoundUniqueInput>;
export const ProviderGrantProviderProviderIdCompoundUniqueInputObjectZodSchema = makeSchema();
