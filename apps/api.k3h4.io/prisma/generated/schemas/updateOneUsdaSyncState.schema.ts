import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaSyncStateSelectObjectSchema as UsdaSyncStateSelectObjectSchema } from './objects/UsdaSyncStateSelect.schema';
import { UsdaSyncStateUpdateInputObjectSchema as UsdaSyncStateUpdateInputObjectSchema } from './objects/UsdaSyncStateUpdateInput.schema';
import { UsdaSyncStateUncheckedUpdateInputObjectSchema as UsdaSyncStateUncheckedUpdateInputObjectSchema } from './objects/UsdaSyncStateUncheckedUpdateInput.schema';
import { UsdaSyncStateWhereUniqueInputObjectSchema as UsdaSyncStateWhereUniqueInputObjectSchema } from './objects/UsdaSyncStateWhereUniqueInput.schema';

export const UsdaSyncStateUpdateOneSchema: z.ZodType<Prisma.UsdaSyncStateUpdateArgs> = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(),  data: z.union([UsdaSyncStateUpdateInputObjectSchema, UsdaSyncStateUncheckedUpdateInputObjectSchema]), where: UsdaSyncStateWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaSyncStateUpdateArgs>;

export const UsdaSyncStateUpdateOneZodSchema = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(),  data: z.union([UsdaSyncStateUpdateInputObjectSchema, UsdaSyncStateUncheckedUpdateInputObjectSchema]), where: UsdaSyncStateWhereUniqueInputObjectSchema }).strict();