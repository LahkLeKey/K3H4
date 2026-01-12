import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitSelectObjectSchema as UsdaUnitSelectObjectSchema } from './objects/UsdaUnitSelect.schema';
import { UsdaUnitWhereUniqueInputObjectSchema as UsdaUnitWhereUniqueInputObjectSchema } from './objects/UsdaUnitWhereUniqueInput.schema';

export const UsdaUnitFindUniqueOrThrowSchema: z.ZodType<Prisma.UsdaUnitFindUniqueOrThrowArgs> = z.object({ select: UsdaUnitSelectObjectSchema.optional(),  where: UsdaUnitWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaUnitFindUniqueOrThrowArgs>;

export const UsdaUnitFindUniqueOrThrowZodSchema = z.object({ select: UsdaUnitSelectObjectSchema.optional(),  where: UsdaUnitWhereUniqueInputObjectSchema }).strict();