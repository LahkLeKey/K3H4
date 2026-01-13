import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceSelectObjectSchema as AgricultureResourceSelectObjectSchema } from './objects/AgricultureResourceSelect.schema';
import { AgricultureResourceIncludeObjectSchema as AgricultureResourceIncludeObjectSchema } from './objects/AgricultureResourceInclude.schema';
import { AgricultureResourceCreateInputObjectSchema as AgricultureResourceCreateInputObjectSchema } from './objects/AgricultureResourceCreateInput.schema';
import { AgricultureResourceUncheckedCreateInputObjectSchema as AgricultureResourceUncheckedCreateInputObjectSchema } from './objects/AgricultureResourceUncheckedCreateInput.schema';

export const AgricultureResourceCreateOneSchema: z.ZodType<Prisma.AgricultureResourceCreateArgs> = z.object({ select: AgricultureResourceSelectObjectSchema.optional(), include: AgricultureResourceIncludeObjectSchema.optional(), data: z.union([AgricultureResourceCreateInputObjectSchema, AgricultureResourceUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceCreateArgs>;

export const AgricultureResourceCreateOneZodSchema = z.object({ select: AgricultureResourceSelectObjectSchema.optional(), include: AgricultureResourceIncludeObjectSchema.optional(), data: z.union([AgricultureResourceCreateInputObjectSchema, AgricultureResourceUncheckedCreateInputObjectSchema]) }).strict();