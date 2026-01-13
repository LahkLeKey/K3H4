import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaSyncStateSelectObjectSchema as UsdaSyncStateSelectObjectSchema } from './objects/UsdaSyncStateSelect.schema';
import { UsdaSyncStateWhereUniqueInputObjectSchema as UsdaSyncStateWhereUniqueInputObjectSchema } from './objects/UsdaSyncStateWhereUniqueInput.schema';

export const UsdaSyncStateFindUniqueSchema: z.ZodType<Prisma.UsdaSyncStateFindUniqueArgs> = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(),  where: UsdaSyncStateWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaSyncStateFindUniqueArgs>;

export const UsdaSyncStateFindUniqueZodSchema = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(),  where: UsdaSyncStateWhereUniqueInputObjectSchema }).strict();