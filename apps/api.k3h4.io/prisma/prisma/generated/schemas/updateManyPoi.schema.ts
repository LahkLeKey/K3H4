import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiUpdateManyMutationInputObjectSchema as PoiUpdateManyMutationInputObjectSchema } from './objects/PoiUpdateManyMutationInput.schema';
import { PoiWhereInputObjectSchema as PoiWhereInputObjectSchema } from './objects/PoiWhereInput.schema';

export const PoiUpdateManySchema: z.ZodType<Prisma.PoiUpdateManyArgs> = z.object({ data: PoiUpdateManyMutationInputObjectSchema, where: PoiWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PoiUpdateManyArgs>;

export const PoiUpdateManyZodSchema = z.object({ data: PoiUpdateManyMutationInputObjectSchema, where: PoiWhereInputObjectSchema.optional() }).strict();