import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionSelectObjectSchema as UsdaRegionSelectObjectSchema } from './objects/UsdaRegionSelect.schema';
import { UsdaRegionUpdateManyMutationInputObjectSchema as UsdaRegionUpdateManyMutationInputObjectSchema } from './objects/UsdaRegionUpdateManyMutationInput.schema';
import { UsdaRegionWhereInputObjectSchema as UsdaRegionWhereInputObjectSchema } from './objects/UsdaRegionWhereInput.schema';

export const UsdaRegionUpdateManyAndReturnSchema: z.ZodType<Prisma.UsdaRegionUpdateManyAndReturnArgs> = z.object({ select: UsdaRegionSelectObjectSchema.optional(), data: UsdaRegionUpdateManyMutationInputObjectSchema, where: UsdaRegionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaRegionUpdateManyAndReturnArgs>;

export const UsdaRegionUpdateManyAndReturnZodSchema = z.object({ select: UsdaRegionSelectObjectSchema.optional(), data: UsdaRegionUpdateManyMutationInputObjectSchema, where: UsdaRegionWhereInputObjectSchema.optional() }).strict();