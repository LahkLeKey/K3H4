import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventorySelectObjectSchema as AgricultureInventorySelectObjectSchema } from './objects/AgricultureInventorySelect.schema';
import { AgricultureInventoryIncludeObjectSchema as AgricultureInventoryIncludeObjectSchema } from './objects/AgricultureInventoryInclude.schema';
import { AgricultureInventoryWhereUniqueInputObjectSchema as AgricultureInventoryWhereUniqueInputObjectSchema } from './objects/AgricultureInventoryWhereUniqueInput.schema';
import { AgricultureInventoryCreateInputObjectSchema as AgricultureInventoryCreateInputObjectSchema } from './objects/AgricultureInventoryCreateInput.schema';
import { AgricultureInventoryUncheckedCreateInputObjectSchema as AgricultureInventoryUncheckedCreateInputObjectSchema } from './objects/AgricultureInventoryUncheckedCreateInput.schema';
import { AgricultureInventoryUpdateInputObjectSchema as AgricultureInventoryUpdateInputObjectSchema } from './objects/AgricultureInventoryUpdateInput.schema';
import { AgricultureInventoryUncheckedUpdateInputObjectSchema as AgricultureInventoryUncheckedUpdateInputObjectSchema } from './objects/AgricultureInventoryUncheckedUpdateInput.schema';

export const AgricultureInventoryUpsertOneSchema: z.ZodType<Prisma.AgricultureInventoryUpsertArgs> = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), include: AgricultureInventoryIncludeObjectSchema.optional(), where: AgricultureInventoryWhereUniqueInputObjectSchema, create: z.union([ AgricultureInventoryCreateInputObjectSchema, AgricultureInventoryUncheckedCreateInputObjectSchema ]), update: z.union([ AgricultureInventoryUpdateInputObjectSchema, AgricultureInventoryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryUpsertArgs>;

export const AgricultureInventoryUpsertOneZodSchema = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), include: AgricultureInventoryIncludeObjectSchema.optional(), where: AgricultureInventoryWhereUniqueInputObjectSchema, create: z.union([ AgricultureInventoryCreateInputObjectSchema, AgricultureInventoryUncheckedCreateInputObjectSchema ]), update: z.union([ AgricultureInventoryUpdateInputObjectSchema, AgricultureInventoryUncheckedUpdateInputObjectSchema ]) }).strict();