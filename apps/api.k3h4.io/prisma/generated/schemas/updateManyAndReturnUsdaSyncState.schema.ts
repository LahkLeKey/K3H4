import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaSyncStateSelectObjectSchema as UsdaSyncStateSelectObjectSchema } from './objects/UsdaSyncStateSelect.schema';
import { UsdaSyncStateUpdateManyMutationInputObjectSchema as UsdaSyncStateUpdateManyMutationInputObjectSchema } from './objects/UsdaSyncStateUpdateManyMutationInput.schema';
import { UsdaSyncStateWhereInputObjectSchema as UsdaSyncStateWhereInputObjectSchema } from './objects/UsdaSyncStateWhereInput.schema';

export const UsdaSyncStateUpdateManyAndReturnSchema: z.ZodType<Prisma.UsdaSyncStateUpdateManyAndReturnArgs> = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(), data: UsdaSyncStateUpdateManyMutationInputObjectSchema, where: UsdaSyncStateWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaSyncStateUpdateManyAndReturnArgs>;

export const UsdaSyncStateUpdateManyAndReturnZodSchema = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(), data: UsdaSyncStateUpdateManyMutationInputObjectSchema, where: UsdaSyncStateWhereInputObjectSchema.optional() }).strict();