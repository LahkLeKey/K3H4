import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionSelectObjectSchema as UsdaRegionSelectObjectSchema } from './objects/UsdaRegionSelect.schema';
import { UsdaRegionWhereUniqueInputObjectSchema as UsdaRegionWhereUniqueInputObjectSchema } from './objects/UsdaRegionWhereUniqueInput.schema';

export const UsdaRegionFindUniqueOrThrowSchema: z.ZodType<Prisma.UsdaRegionFindUniqueOrThrowArgs> = z.object({ select: UsdaRegionSelectObjectSchema.optional(),  where: UsdaRegionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaRegionFindUniqueOrThrowArgs>;

export const UsdaRegionFindUniqueOrThrowZodSchema = z.object({ select: UsdaRegionSelectObjectSchema.optional(),  where: UsdaRegionWhereUniqueInputObjectSchema }).strict();