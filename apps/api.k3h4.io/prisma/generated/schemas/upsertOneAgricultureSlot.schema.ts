import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureSlotSelectObjectSchema as AgricultureSlotSelectObjectSchema } from './objects/AgricultureSlotSelect.schema';
import { AgricultureSlotIncludeObjectSchema as AgricultureSlotIncludeObjectSchema } from './objects/AgricultureSlotInclude.schema';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './objects/AgricultureSlotWhereUniqueInput.schema';
import { AgricultureSlotCreateInputObjectSchema as AgricultureSlotCreateInputObjectSchema } from './objects/AgricultureSlotCreateInput.schema';
import { AgricultureSlotUncheckedCreateInputObjectSchema as AgricultureSlotUncheckedCreateInputObjectSchema } from './objects/AgricultureSlotUncheckedCreateInput.schema';
import { AgricultureSlotUpdateInputObjectSchema as AgricultureSlotUpdateInputObjectSchema } from './objects/AgricultureSlotUpdateInput.schema';
import { AgricultureSlotUncheckedUpdateInputObjectSchema as AgricultureSlotUncheckedUpdateInputObjectSchema } from './objects/AgricultureSlotUncheckedUpdateInput.schema';

export const AgricultureSlotUpsertOneSchema: z.ZodType<Prisma.AgricultureSlotUpsertArgs> = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), include: AgricultureSlotIncludeObjectSchema.optional(), where: AgricultureSlotWhereUniqueInputObjectSchema, create: z.union([ AgricultureSlotCreateInputObjectSchema, AgricultureSlotUncheckedCreateInputObjectSchema ]), update: z.union([ AgricultureSlotUpdateInputObjectSchema, AgricultureSlotUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AgricultureSlotUpsertArgs>;

export const AgricultureSlotUpsertOneZodSchema = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), include: AgricultureSlotIncludeObjectSchema.optional(), where: AgricultureSlotWhereUniqueInputObjectSchema, create: z.union([ AgricultureSlotCreateInputObjectSchema, AgricultureSlotUncheckedCreateInputObjectSchema ]), update: z.union([ AgricultureSlotUpdateInputObjectSchema, AgricultureSlotUncheckedUpdateInputObjectSchema ]) }).strict();