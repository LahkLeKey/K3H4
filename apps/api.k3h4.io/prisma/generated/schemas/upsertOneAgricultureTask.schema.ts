import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureTaskSelectObjectSchema as AgricultureTaskSelectObjectSchema } from './objects/AgricultureTaskSelect.schema';
import { AgricultureTaskIncludeObjectSchema as AgricultureTaskIncludeObjectSchema } from './objects/AgricultureTaskInclude.schema';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './objects/AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskCreateInputObjectSchema as AgricultureTaskCreateInputObjectSchema } from './objects/AgricultureTaskCreateInput.schema';
import { AgricultureTaskUncheckedCreateInputObjectSchema as AgricultureTaskUncheckedCreateInputObjectSchema } from './objects/AgricultureTaskUncheckedCreateInput.schema';
import { AgricultureTaskUpdateInputObjectSchema as AgricultureTaskUpdateInputObjectSchema } from './objects/AgricultureTaskUpdateInput.schema';
import { AgricultureTaskUncheckedUpdateInputObjectSchema as AgricultureTaskUncheckedUpdateInputObjectSchema } from './objects/AgricultureTaskUncheckedUpdateInput.schema';

export const AgricultureTaskUpsertOneSchema: z.ZodType<Prisma.AgricultureTaskUpsertArgs> = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), include: AgricultureTaskIncludeObjectSchema.optional(), where: AgricultureTaskWhereUniqueInputObjectSchema, create: z.union([ AgricultureTaskCreateInputObjectSchema, AgricultureTaskUncheckedCreateInputObjectSchema ]), update: z.union([ AgricultureTaskUpdateInputObjectSchema, AgricultureTaskUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskUpsertArgs>;

export const AgricultureTaskUpsertOneZodSchema = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), include: AgricultureTaskIncludeObjectSchema.optional(), where: AgricultureTaskWhereUniqueInputObjectSchema, create: z.union([ AgricultureTaskCreateInputObjectSchema, AgricultureTaskUncheckedCreateInputObjectSchema ]), update: z.union([ AgricultureTaskUpdateInputObjectSchema, AgricultureTaskUncheckedUpdateInputObjectSchema ]) }).strict();