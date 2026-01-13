import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityUpdateManyMutationInputObjectSchema as UsdaCommodityUpdateManyMutationInputObjectSchema } from './objects/UsdaCommodityUpdateManyMutationInput.schema';
import { UsdaCommodityWhereInputObjectSchema as UsdaCommodityWhereInputObjectSchema } from './objects/UsdaCommodityWhereInput.schema';

export const UsdaCommodityUpdateManySchema: z.ZodType<Prisma.UsdaCommodityUpdateManyArgs> = z.object({ data: UsdaCommodityUpdateManyMutationInputObjectSchema, where: UsdaCommodityWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityUpdateManyArgs>;

export const UsdaCommodityUpdateManyZodSchema = z.object({ data: UsdaCommodityUpdateManyMutationInputObjectSchema, where: UsdaCommodityWhereInputObjectSchema.optional() }).strict();