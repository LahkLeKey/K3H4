import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommoditySelectObjectSchema as UsdaCommoditySelectObjectSchema } from './objects/UsdaCommoditySelect.schema';
import { UsdaCommodityUpdateManyMutationInputObjectSchema as UsdaCommodityUpdateManyMutationInputObjectSchema } from './objects/UsdaCommodityUpdateManyMutationInput.schema';
import { UsdaCommodityWhereInputObjectSchema as UsdaCommodityWhereInputObjectSchema } from './objects/UsdaCommodityWhereInput.schema';

export const UsdaCommodityUpdateManyAndReturnSchema: z.ZodType<Prisma.UsdaCommodityUpdateManyAndReturnArgs> = z.object({ select: UsdaCommoditySelectObjectSchema.optional(), data: UsdaCommodityUpdateManyMutationInputObjectSchema, where: UsdaCommodityWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityUpdateManyAndReturnArgs>;

export const UsdaCommodityUpdateManyAndReturnZodSchema = z.object({ select: UsdaCommoditySelectObjectSchema.optional(), data: UsdaCommodityUpdateManyMutationInputObjectSchema, where: UsdaCommodityWhereInputObjectSchema.optional() }).strict();