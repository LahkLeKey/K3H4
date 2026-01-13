import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaSyncStateUpdateManyMutationInputObjectSchema as UsdaSyncStateUpdateManyMutationInputObjectSchema } from './objects/UsdaSyncStateUpdateManyMutationInput.schema';
import { UsdaSyncStateWhereInputObjectSchema as UsdaSyncStateWhereInputObjectSchema } from './objects/UsdaSyncStateWhereInput.schema';

export const UsdaSyncStateUpdateManySchema: z.ZodType<Prisma.UsdaSyncStateUpdateManyArgs> = z.object({ data: UsdaSyncStateUpdateManyMutationInputObjectSchema, where: UsdaSyncStateWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaSyncStateUpdateManyArgs>;

export const UsdaSyncStateUpdateManyZodSchema = z.object({ data: UsdaSyncStateUpdateManyMutationInputObjectSchema, where: UsdaSyncStateWhereInputObjectSchema.optional() }).strict();