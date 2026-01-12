import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaSyncStateWhereInputObjectSchema as UsdaSyncStateWhereInputObjectSchema } from './objects/UsdaSyncStateWhereInput.schema';

export const UsdaSyncStateDeleteManySchema: z.ZodType<Prisma.UsdaSyncStateDeleteManyArgs> = z.object({ where: UsdaSyncStateWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaSyncStateDeleteManyArgs>;

export const UsdaSyncStateDeleteManyZodSchema = z.object({ where: UsdaSyncStateWhereInputObjectSchema.optional() }).strict();