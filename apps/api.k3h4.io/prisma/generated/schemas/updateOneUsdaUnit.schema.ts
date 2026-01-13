import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitSelectObjectSchema as UsdaUnitSelectObjectSchema } from './objects/UsdaUnitSelect.schema';
import { UsdaUnitUpdateInputObjectSchema as UsdaUnitUpdateInputObjectSchema } from './objects/UsdaUnitUpdateInput.schema';
import { UsdaUnitUncheckedUpdateInputObjectSchema as UsdaUnitUncheckedUpdateInputObjectSchema } from './objects/UsdaUnitUncheckedUpdateInput.schema';
import { UsdaUnitWhereUniqueInputObjectSchema as UsdaUnitWhereUniqueInputObjectSchema } from './objects/UsdaUnitWhereUniqueInput.schema';

export const UsdaUnitUpdateOneSchema: z.ZodType<Prisma.UsdaUnitUpdateArgs> = z.object({ select: UsdaUnitSelectObjectSchema.optional(),  data: z.union([UsdaUnitUpdateInputObjectSchema, UsdaUnitUncheckedUpdateInputObjectSchema]), where: UsdaUnitWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaUnitUpdateArgs>;

export const UsdaUnitUpdateOneZodSchema = z.object({ select: UsdaUnitSelectObjectSchema.optional(),  data: z.union([UsdaUnitUpdateInputObjectSchema, UsdaUnitUncheckedUpdateInputObjectSchema]), where: UsdaUnitWhereUniqueInputObjectSchema }).strict();