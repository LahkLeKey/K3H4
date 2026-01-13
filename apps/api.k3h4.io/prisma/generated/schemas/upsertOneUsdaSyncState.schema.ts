import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaSyncStateSelectObjectSchema as UsdaSyncStateSelectObjectSchema } from './objects/UsdaSyncStateSelect.schema';
import { UsdaSyncStateWhereUniqueInputObjectSchema as UsdaSyncStateWhereUniqueInputObjectSchema } from './objects/UsdaSyncStateWhereUniqueInput.schema';
import { UsdaSyncStateCreateInputObjectSchema as UsdaSyncStateCreateInputObjectSchema } from './objects/UsdaSyncStateCreateInput.schema';
import { UsdaSyncStateUncheckedCreateInputObjectSchema as UsdaSyncStateUncheckedCreateInputObjectSchema } from './objects/UsdaSyncStateUncheckedCreateInput.schema';
import { UsdaSyncStateUpdateInputObjectSchema as UsdaSyncStateUpdateInputObjectSchema } from './objects/UsdaSyncStateUpdateInput.schema';
import { UsdaSyncStateUncheckedUpdateInputObjectSchema as UsdaSyncStateUncheckedUpdateInputObjectSchema } from './objects/UsdaSyncStateUncheckedUpdateInput.schema';

export const UsdaSyncStateUpsertOneSchema: z.ZodType<Prisma.UsdaSyncStateUpsertArgs> = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(),  where: UsdaSyncStateWhereUniqueInputObjectSchema, create: z.union([ UsdaSyncStateCreateInputObjectSchema, UsdaSyncStateUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaSyncStateUpdateInputObjectSchema, UsdaSyncStateUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.UsdaSyncStateUpsertArgs>;

export const UsdaSyncStateUpsertOneZodSchema = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(),  where: UsdaSyncStateWhereUniqueInputObjectSchema, create: z.union([ UsdaSyncStateCreateInputObjectSchema, UsdaSyncStateUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaSyncStateUpdateInputObjectSchema, UsdaSyncStateUncheckedUpdateInputObjectSchema ]) }).strict();