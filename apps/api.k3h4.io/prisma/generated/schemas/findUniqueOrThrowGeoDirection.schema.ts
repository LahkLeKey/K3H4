import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSelectObjectSchema as GeoDirectionSelectObjectSchema } from './objects/GeoDirectionSelect.schema';
import { GeoDirectionIncludeObjectSchema as GeoDirectionIncludeObjectSchema } from './objects/GeoDirectionInclude.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './objects/GeoDirectionWhereUniqueInput.schema';

export const GeoDirectionFindUniqueOrThrowSchema: z.ZodType<Prisma.GeoDirectionFindUniqueOrThrowArgs> = z.object({ select: GeoDirectionSelectObjectSchema.optional(), include: GeoDirectionIncludeObjectSchema.optional(), where: GeoDirectionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoDirectionFindUniqueOrThrowArgs>;

export const GeoDirectionFindUniqueOrThrowZodSchema = z.object({ select: GeoDirectionSelectObjectSchema.optional(), include: GeoDirectionIncludeObjectSchema.optional(), where: GeoDirectionWhereUniqueInputObjectSchema }).strict();