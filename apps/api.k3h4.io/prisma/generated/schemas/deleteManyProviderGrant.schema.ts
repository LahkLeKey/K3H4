import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProviderGrantWhereInputObjectSchema as ProviderGrantWhereInputObjectSchema } from './objects/ProviderGrantWhereInput.schema';

export const ProviderGrantDeleteManySchema: z.ZodType<Prisma.ProviderGrantDeleteManyArgs> = z.object({ where: ProviderGrantWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProviderGrantDeleteManyArgs>;

export const ProviderGrantDeleteManyZodSchema = z.object({ where: ProviderGrantWhereInputObjectSchema.optional() }).strict();