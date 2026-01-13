import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitWhereInputObjectSchema as UsdaUnitWhereInputObjectSchema } from './objects/UsdaUnitWhereInput.schema';

export const UsdaUnitDeleteManySchema: z.ZodType<Prisma.UsdaUnitDeleteManyArgs> = z.object({ where: UsdaUnitWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaUnitDeleteManyArgs>;

export const UsdaUnitDeleteManyZodSchema = z.object({ where: UsdaUnitWhereInputObjectSchema.optional() }).strict();