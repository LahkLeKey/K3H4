import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSelectObjectSchema as GeoDirectionSelectObjectSchema } from './objects/GeoDirectionSelect.schema';
import { GeoDirectionIncludeObjectSchema as GeoDirectionIncludeObjectSchema } from './objects/GeoDirectionInclude.schema';
import { GeoDirectionUpdateInputObjectSchema as GeoDirectionUpdateInputObjectSchema } from './objects/GeoDirectionUpdateInput.schema';
import { GeoDirectionUncheckedUpdateInputObjectSchema as GeoDirectionUncheckedUpdateInputObjectSchema } from './objects/GeoDirectionUncheckedUpdateInput.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './objects/GeoDirectionWhereUniqueInput.schema';

export const GeoDirectionUpdateOneSchema: z.ZodType<Prisma.GeoDirectionUpdateArgs> = z.object({ select: GeoDirectionSelectObjectSchema.optional(), include: GeoDirectionIncludeObjectSchema.optional(), data: z.union([GeoDirectionUpdateInputObjectSchema, GeoDirectionUncheckedUpdateInputObjectSchema]), where: GeoDirectionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoDirectionUpdateArgs>;

export const GeoDirectionUpdateOneZodSchema = z.object({ select: GeoDirectionSelectObjectSchema.optional(), include: GeoDirectionIncludeObjectSchema.optional(), data: z.union([GeoDirectionUpdateInputObjectSchema, GeoDirectionUncheckedUpdateInputObjectSchema]), where: GeoDirectionWhereUniqueInputObjectSchema }).strict();