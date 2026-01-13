import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionUpdateManyMutationInputObjectSchema as UsdaRegionUpdateManyMutationInputObjectSchema } from './objects/UsdaRegionUpdateManyMutationInput.schema';
import { UsdaRegionWhereInputObjectSchema as UsdaRegionWhereInputObjectSchema } from './objects/UsdaRegionWhereInput.schema';

export const UsdaRegionUpdateManySchema: z.ZodType<Prisma.UsdaRegionUpdateManyArgs> = z.object({ data: UsdaRegionUpdateManyMutationInputObjectSchema, where: UsdaRegionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaRegionUpdateManyArgs>;

export const UsdaRegionUpdateManyZodSchema = z.object({ data: UsdaRegionUpdateManyMutationInputObjectSchema, where: UsdaRegionWhereInputObjectSchema.optional() }).strict();