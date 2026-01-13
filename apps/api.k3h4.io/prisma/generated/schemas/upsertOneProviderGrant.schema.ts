import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProviderGrantSelectObjectSchema as ProviderGrantSelectObjectSchema } from './objects/ProviderGrantSelect.schema';
import { ProviderGrantIncludeObjectSchema as ProviderGrantIncludeObjectSchema } from './objects/ProviderGrantInclude.schema';
import { ProviderGrantWhereUniqueInputObjectSchema as ProviderGrantWhereUniqueInputObjectSchema } from './objects/ProviderGrantWhereUniqueInput.schema';
import { ProviderGrantCreateInputObjectSchema as ProviderGrantCreateInputObjectSchema } from './objects/ProviderGrantCreateInput.schema';
import { ProviderGrantUncheckedCreateInputObjectSchema as ProviderGrantUncheckedCreateInputObjectSchema } from './objects/ProviderGrantUncheckedCreateInput.schema';
import { ProviderGrantUpdateInputObjectSchema as ProviderGrantUpdateInputObjectSchema } from './objects/ProviderGrantUpdateInput.schema';
import { ProviderGrantUncheckedUpdateInputObjectSchema as ProviderGrantUncheckedUpdateInputObjectSchema } from './objects/ProviderGrantUncheckedUpdateInput.schema';

export const ProviderGrantUpsertOneSchema: z.ZodType<Prisma.ProviderGrantUpsertArgs> = z.object({ select: ProviderGrantSelectObjectSchema.optional(), include: ProviderGrantIncludeObjectSchema.optional(), where: ProviderGrantWhereUniqueInputObjectSchema, create: z.union([ ProviderGrantCreateInputObjectSchema, ProviderGrantUncheckedCreateInputObjectSchema ]), update: z.union([ ProviderGrantUpdateInputObjectSchema, ProviderGrantUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ProviderGrantUpsertArgs>;

export const ProviderGrantUpsertOneZodSchema = z.object({ select: ProviderGrantSelectObjectSchema.optional(), include: ProviderGrantIncludeObjectSchema.optional(), where: ProviderGrantWhereUniqueInputObjectSchema, create: z.union([ ProviderGrantCreateInputObjectSchema, ProviderGrantUncheckedCreateInputObjectSchema ]), update: z.union([ ProviderGrantUpdateInputObjectSchema, ProviderGrantUncheckedUpdateInputObjectSchema ]) }).strict();