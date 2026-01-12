import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitUpdateManyMutationInputObjectSchema as UsdaUnitUpdateManyMutationInputObjectSchema } from './objects/UsdaUnitUpdateManyMutationInput.schema';
import { UsdaUnitWhereInputObjectSchema as UsdaUnitWhereInputObjectSchema } from './objects/UsdaUnitWhereInput.schema';

export const UsdaUnitUpdateManySchema: z.ZodType<Prisma.UsdaUnitUpdateManyArgs> = z.object({ data: UsdaUnitUpdateManyMutationInputObjectSchema, where: UsdaUnitWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaUnitUpdateManyArgs>;

export const UsdaUnitUpdateManyZodSchema = z.object({ data: UsdaUnitUpdateManyMutationInputObjectSchema, where: UsdaUnitWhereInputObjectSchema.optional() }).strict();