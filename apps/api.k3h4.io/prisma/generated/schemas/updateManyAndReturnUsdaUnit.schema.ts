import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitSelectObjectSchema as UsdaUnitSelectObjectSchema } from './objects/UsdaUnitSelect.schema';
import { UsdaUnitUpdateManyMutationInputObjectSchema as UsdaUnitUpdateManyMutationInputObjectSchema } from './objects/UsdaUnitUpdateManyMutationInput.schema';
import { UsdaUnitWhereInputObjectSchema as UsdaUnitWhereInputObjectSchema } from './objects/UsdaUnitWhereInput.schema';

export const UsdaUnitUpdateManyAndReturnSchema: z.ZodType<Prisma.UsdaUnitUpdateManyAndReturnArgs> = z.object({ select: UsdaUnitSelectObjectSchema.optional(), data: UsdaUnitUpdateManyMutationInputObjectSchema, where: UsdaUnitWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaUnitUpdateManyAndReturnArgs>;

export const UsdaUnitUpdateManyAndReturnZodSchema = z.object({ select: UsdaUnitSelectObjectSchema.optional(), data: UsdaUnitUpdateManyMutationInputObjectSchema, where: UsdaUnitWhereInputObjectSchema.optional() }).strict();