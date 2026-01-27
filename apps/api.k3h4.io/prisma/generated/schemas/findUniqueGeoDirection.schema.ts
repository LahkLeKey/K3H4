import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSelectObjectSchema as GeoDirectionSelectObjectSchema } from './objects/GeoDirectionSelect.schema';
import { GeoDirectionIncludeObjectSchema as GeoDirectionIncludeObjectSchema } from './objects/GeoDirectionInclude.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './objects/GeoDirectionWhereUniqueInput.schema';

export const GeoDirectionFindUniqueSchema: z.ZodType<Prisma.GeoDirectionFindUniqueArgs> = z.object({ select: GeoDirectionSelectObjectSchema.optional(), include: GeoDirectionIncludeObjectSchema.optional(), where: GeoDirectionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoDirectionFindUniqueArgs>;

export const GeoDirectionFindUniqueZodSchema = z.object({ select: GeoDirectionSelectObjectSchema.optional(), include: GeoDirectionIncludeObjectSchema.optional(), where: GeoDirectionWhereUniqueInputObjectSchema }).strict();