import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiWhereInputObjectSchema as PoiWhereInputObjectSchema } from './objects/PoiWhereInput.schema';

export const PoiDeleteManySchema: z.ZodType<Prisma.PoiDeleteManyArgs> = z.object({ where: PoiWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PoiDeleteManyArgs>;

export const PoiDeleteManyZodSchema = z.object({ where: PoiWhereInputObjectSchema.optional() }).strict();