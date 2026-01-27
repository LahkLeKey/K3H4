import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSelectObjectSchema as GeoDirectionSelectObjectSchema } from './objects/GeoDirectionSelect.schema';
import { GeoDirectionIncludeObjectSchema as GeoDirectionIncludeObjectSchema } from './objects/GeoDirectionInclude.schema';
import { GeoDirectionCreateInputObjectSchema as GeoDirectionCreateInputObjectSchema } from './objects/GeoDirectionCreateInput.schema';
import { GeoDirectionUncheckedCreateInputObjectSchema as GeoDirectionUncheckedCreateInputObjectSchema } from './objects/GeoDirectionUncheckedCreateInput.schema';

export const GeoDirectionCreateOneSchema: z.ZodType<Prisma.GeoDirectionCreateArgs> = z.object({ select: GeoDirectionSelectObjectSchema.optional(), include: GeoDirectionIncludeObjectSchema.optional(), data: z.union([GeoDirectionCreateInputObjectSchema, GeoDirectionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.GeoDirectionCreateArgs>;

export const GeoDirectionCreateOneZodSchema = z.object({ select: GeoDirectionSelectObjectSchema.optional(), include: GeoDirectionIncludeObjectSchema.optional(), data: z.union([GeoDirectionCreateInputObjectSchema, GeoDirectionUncheckedCreateInputObjectSchema]) }).strict();