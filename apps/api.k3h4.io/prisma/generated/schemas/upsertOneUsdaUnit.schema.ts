import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitSelectObjectSchema as UsdaUnitSelectObjectSchema } from './objects/UsdaUnitSelect.schema';
import { UsdaUnitWhereUniqueInputObjectSchema as UsdaUnitWhereUniqueInputObjectSchema } from './objects/UsdaUnitWhereUniqueInput.schema';
import { UsdaUnitCreateInputObjectSchema as UsdaUnitCreateInputObjectSchema } from './objects/UsdaUnitCreateInput.schema';
import { UsdaUnitUncheckedCreateInputObjectSchema as UsdaUnitUncheckedCreateInputObjectSchema } from './objects/UsdaUnitUncheckedCreateInput.schema';
import { UsdaUnitUpdateInputObjectSchema as UsdaUnitUpdateInputObjectSchema } from './objects/UsdaUnitUpdateInput.schema';
import { UsdaUnitUncheckedUpdateInputObjectSchema as UsdaUnitUncheckedUpdateInputObjectSchema } from './objects/UsdaUnitUncheckedUpdateInput.schema';

export const UsdaUnitUpsertOneSchema: z.ZodType<Prisma.UsdaUnitUpsertArgs> = z.object({ select: UsdaUnitSelectObjectSchema.optional(),  where: UsdaUnitWhereUniqueInputObjectSchema, create: z.union([ UsdaUnitCreateInputObjectSchema, UsdaUnitUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaUnitUpdateInputObjectSchema, UsdaUnitUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.UsdaUnitUpsertArgs>;

export const UsdaUnitUpsertOneZodSchema = z.object({ select: UsdaUnitSelectObjectSchema.optional(),  where: UsdaUnitWhereUniqueInputObjectSchema, create: z.union([ UsdaUnitCreateInputObjectSchema, UsdaUnitUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaUnitUpdateInputObjectSchema, UsdaUnitUncheckedUpdateInputObjectSchema ]) }).strict();