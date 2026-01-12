import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitSelectObjectSchema as UsdaUnitSelectObjectSchema } from './objects/UsdaUnitSelect.schema';
import { UsdaUnitWhereUniqueInputObjectSchema as UsdaUnitWhereUniqueInputObjectSchema } from './objects/UsdaUnitWhereUniqueInput.schema';

export const UsdaUnitDeleteOneSchema: z.ZodType<Prisma.UsdaUnitDeleteArgs> = z.object({ select: UsdaUnitSelectObjectSchema.optional(),  where: UsdaUnitWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaUnitDeleteArgs>;

export const UsdaUnitDeleteOneZodSchema = z.object({ select: UsdaUnitSelectObjectSchema.optional(),  where: UsdaUnitWhereUniqueInputObjectSchema }).strict();