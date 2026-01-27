import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSelectObjectSchema as GeoDirectionSelectObjectSchema } from './objects/GeoDirectionSelect.schema';
import { GeoDirectionIncludeObjectSchema as GeoDirectionIncludeObjectSchema } from './objects/GeoDirectionInclude.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './objects/GeoDirectionWhereUniqueInput.schema';

export const GeoDirectionDeleteOneSchema: z.ZodType<Prisma.GeoDirectionDeleteArgs> = z.object({ select: GeoDirectionSelectObjectSchema.optional(), include: GeoDirectionIncludeObjectSchema.optional(), where: GeoDirectionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoDirectionDeleteArgs>;

export const GeoDirectionDeleteOneZodSchema = z.object({ select: GeoDirectionSelectObjectSchema.optional(), include: GeoDirectionIncludeObjectSchema.optional(), where: GeoDirectionWhereUniqueInputObjectSchema }).strict();