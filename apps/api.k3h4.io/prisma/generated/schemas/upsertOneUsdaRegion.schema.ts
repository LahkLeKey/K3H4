import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionSelectObjectSchema as UsdaRegionSelectObjectSchema } from './objects/UsdaRegionSelect.schema';
import { UsdaRegionWhereUniqueInputObjectSchema as UsdaRegionWhereUniqueInputObjectSchema } from './objects/UsdaRegionWhereUniqueInput.schema';
import { UsdaRegionCreateInputObjectSchema as UsdaRegionCreateInputObjectSchema } from './objects/UsdaRegionCreateInput.schema';
import { UsdaRegionUncheckedCreateInputObjectSchema as UsdaRegionUncheckedCreateInputObjectSchema } from './objects/UsdaRegionUncheckedCreateInput.schema';
import { UsdaRegionUpdateInputObjectSchema as UsdaRegionUpdateInputObjectSchema } from './objects/UsdaRegionUpdateInput.schema';
import { UsdaRegionUncheckedUpdateInputObjectSchema as UsdaRegionUncheckedUpdateInputObjectSchema } from './objects/UsdaRegionUncheckedUpdateInput.schema';

export const UsdaRegionUpsertOneSchema: z.ZodType<Prisma.UsdaRegionUpsertArgs> = z.object({ select: UsdaRegionSelectObjectSchema.optional(),  where: UsdaRegionWhereUniqueInputObjectSchema, create: z.union([ UsdaRegionCreateInputObjectSchema, UsdaRegionUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaRegionUpdateInputObjectSchema, UsdaRegionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.UsdaRegionUpsertArgs>;

export const UsdaRegionUpsertOneZodSchema = z.object({ select: UsdaRegionSelectObjectSchema.optional(),  where: UsdaRegionWhereUniqueInputObjectSchema, create: z.union([ UsdaRegionCreateInputObjectSchema, UsdaRegionUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaRegionUpdateInputObjectSchema, UsdaRegionUncheckedUpdateInputObjectSchema ]) }).strict();