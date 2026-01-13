import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommoditySelectObjectSchema as UsdaCommoditySelectObjectSchema } from './objects/UsdaCommoditySelect.schema';
import { UsdaCommodityWhereUniqueInputObjectSchema as UsdaCommodityWhereUniqueInputObjectSchema } from './objects/UsdaCommodityWhereUniqueInput.schema';
import { UsdaCommodityCreateInputObjectSchema as UsdaCommodityCreateInputObjectSchema } from './objects/UsdaCommodityCreateInput.schema';
import { UsdaCommodityUncheckedCreateInputObjectSchema as UsdaCommodityUncheckedCreateInputObjectSchema } from './objects/UsdaCommodityUncheckedCreateInput.schema';
import { UsdaCommodityUpdateInputObjectSchema as UsdaCommodityUpdateInputObjectSchema } from './objects/UsdaCommodityUpdateInput.schema';
import { UsdaCommodityUncheckedUpdateInputObjectSchema as UsdaCommodityUncheckedUpdateInputObjectSchema } from './objects/UsdaCommodityUncheckedUpdateInput.schema';

export const UsdaCommodityUpsertOneSchema: z.ZodType<Prisma.UsdaCommodityUpsertArgs> = z.object({ select: UsdaCommoditySelectObjectSchema.optional(),  where: UsdaCommodityWhereUniqueInputObjectSchema, create: z.union([ UsdaCommodityCreateInputObjectSchema, UsdaCommodityUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaCommodityUpdateInputObjectSchema, UsdaCommodityUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityUpsertArgs>;

export const UsdaCommodityUpsertOneZodSchema = z.object({ select: UsdaCommoditySelectObjectSchema.optional(),  where: UsdaCommodityWhereUniqueInputObjectSchema, create: z.union([ UsdaCommodityCreateInputObjectSchema, UsdaCommodityUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaCommodityUpdateInputObjectSchema, UsdaCommodityUncheckedUpdateInputObjectSchema ]) }).strict();