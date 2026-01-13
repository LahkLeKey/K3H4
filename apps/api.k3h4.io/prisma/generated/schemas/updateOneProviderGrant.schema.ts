import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProviderGrantSelectObjectSchema as ProviderGrantSelectObjectSchema } from './objects/ProviderGrantSelect.schema';
import { ProviderGrantIncludeObjectSchema as ProviderGrantIncludeObjectSchema } from './objects/ProviderGrantInclude.schema';
import { ProviderGrantUpdateInputObjectSchema as ProviderGrantUpdateInputObjectSchema } from './objects/ProviderGrantUpdateInput.schema';
import { ProviderGrantUncheckedUpdateInputObjectSchema as ProviderGrantUncheckedUpdateInputObjectSchema } from './objects/ProviderGrantUncheckedUpdateInput.schema';
import { ProviderGrantWhereUniqueInputObjectSchema as ProviderGrantWhereUniqueInputObjectSchema } from './objects/ProviderGrantWhereUniqueInput.schema';

export const ProviderGrantUpdateOneSchema: z.ZodType<Prisma.ProviderGrantUpdateArgs> = z.object({ select: ProviderGrantSelectObjectSchema.optional(), include: ProviderGrantIncludeObjectSchema.optional(), data: z.union([ProviderGrantUpdateInputObjectSchema, ProviderGrantUncheckedUpdateInputObjectSchema]), where: ProviderGrantWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProviderGrantUpdateArgs>;

export const ProviderGrantUpdateOneZodSchema = z.object({ select: ProviderGrantSelectObjectSchema.optional(), include: ProviderGrantIncludeObjectSchema.optional(), data: z.union([ProviderGrantUpdateInputObjectSchema, ProviderGrantUncheckedUpdateInputObjectSchema]), where: ProviderGrantWhereUniqueInputObjectSchema }).strict();