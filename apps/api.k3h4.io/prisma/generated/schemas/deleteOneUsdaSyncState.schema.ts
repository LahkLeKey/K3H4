import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaSyncStateSelectObjectSchema as UsdaSyncStateSelectObjectSchema } from './objects/UsdaSyncStateSelect.schema';
import { UsdaSyncStateWhereUniqueInputObjectSchema as UsdaSyncStateWhereUniqueInputObjectSchema } from './objects/UsdaSyncStateWhereUniqueInput.schema';

export const UsdaSyncStateDeleteOneSchema: z.ZodType<Prisma.UsdaSyncStateDeleteArgs> = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(),  where: UsdaSyncStateWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaSyncStateDeleteArgs>;

export const UsdaSyncStateDeleteOneZodSchema = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(),  where: UsdaSyncStateWhereUniqueInputObjectSchema }).strict();