import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiSelectObjectSchema as PoiSelectObjectSchema } from './objects/PoiSelect.schema';
import { PoiUpdateManyMutationInputObjectSchema as PoiUpdateManyMutationInputObjectSchema } from './objects/PoiUpdateManyMutationInput.schema';
import { PoiWhereInputObjectSchema as PoiWhereInputObjectSchema } from './objects/PoiWhereInput.schema';

export const PoiUpdateManyAndReturnSchema: z.ZodType<Prisma.PoiUpdateManyAndReturnArgs> = z.object({ select: PoiSelectObjectSchema.optional(), data: PoiUpdateManyMutationInputObjectSchema, where: PoiWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PoiUpdateManyAndReturnArgs>;

export const PoiUpdateManyAndReturnZodSchema = z.object({ select: PoiSelectObjectSchema.optional(), data: PoiUpdateManyMutationInputObjectSchema, where: PoiWhereInputObjectSchema.optional() }).strict();