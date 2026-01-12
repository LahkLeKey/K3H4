import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionSelectObjectSchema as UsdaRegionSelectObjectSchema } from './objects/UsdaRegionSelect.schema';
import { UsdaRegionWhereUniqueInputObjectSchema as UsdaRegionWhereUniqueInputObjectSchema } from './objects/UsdaRegionWhereUniqueInput.schema';

export const UsdaRegionFindUniqueSchema: z.ZodType<Prisma.UsdaRegionFindUniqueArgs> = z.object({ select: UsdaRegionSelectObjectSchema.optional(),  where: UsdaRegionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaRegionFindUniqueArgs>;

export const UsdaRegionFindUniqueZodSchema = z.object({ select: UsdaRegionSelectObjectSchema.optional(),  where: UsdaRegionWhereUniqueInputObjectSchema }).strict();