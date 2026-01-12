import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceSelectObjectSchema as AgricultureResourceSelectObjectSchema } from './objects/AgricultureResourceSelect.schema';
import { AgricultureResourceIncludeObjectSchema as AgricultureResourceIncludeObjectSchema } from './objects/AgricultureResourceInclude.schema';
import { AgricultureResourceWhereUniqueInputObjectSchema as AgricultureResourceWhereUniqueInputObjectSchema } from './objects/AgricultureResourceWhereUniqueInput.schema';
import { AgricultureResourceCreateInputObjectSchema as AgricultureResourceCreateInputObjectSchema } from './objects/AgricultureResourceCreateInput.schema';
import { AgricultureResourceUncheckedCreateInputObjectSchema as AgricultureResourceUncheckedCreateInputObjectSchema } from './objects/AgricultureResourceUncheckedCreateInput.schema';
import { AgricultureResourceUpdateInputObjectSchema as AgricultureResourceUpdateInputObjectSchema } from './objects/AgricultureResourceUpdateInput.schema';
import { AgricultureResourceUncheckedUpdateInputObjectSchema as AgricultureResourceUncheckedUpdateInputObjectSchema } from './objects/AgricultureResourceUncheckedUpdateInput.schema';

export const AgricultureResourceUpsertOneSchema: z.ZodType<Prisma.AgricultureResourceUpsertArgs> = z.object({ select: AgricultureResourceSelectObjectSchema.optional(), include: AgricultureResourceIncludeObjectSchema.optional(), where: AgricultureResourceWhereUniqueInputObjectSchema, create: z.union([ AgricultureResourceCreateInputObjectSchema, AgricultureResourceUncheckedCreateInputObjectSchema ]), update: z.union([ AgricultureResourceUpdateInputObjectSchema, AgricultureResourceUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceUpsertArgs>;

export const AgricultureResourceUpsertOneZodSchema = z.object({ select: AgricultureResourceSelectObjectSchema.optional(), include: AgricultureResourceIncludeObjectSchema.optional(), where: AgricultureResourceWhereUniqueInputObjectSchema, create: z.union([ AgricultureResourceCreateInputObjectSchema, AgricultureResourceUncheckedCreateInputObjectSchema ]), update: z.union([ AgricultureResourceUpdateInputObjectSchema, AgricultureResourceUncheckedUpdateInputObjectSchema ]) }).strict();