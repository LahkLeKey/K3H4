import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProviderGrantSelectObjectSchema as ProviderGrantSelectObjectSchema } from './objects/ProviderGrantSelect.schema';
import { ProviderGrantIncludeObjectSchema as ProviderGrantIncludeObjectSchema } from './objects/ProviderGrantInclude.schema';
import { ProviderGrantCreateInputObjectSchema as ProviderGrantCreateInputObjectSchema } from './objects/ProviderGrantCreateInput.schema';
import { ProviderGrantUncheckedCreateInputObjectSchema as ProviderGrantUncheckedCreateInputObjectSchema } from './objects/ProviderGrantUncheckedCreateInput.schema';

export const ProviderGrantCreateOneSchema: z.ZodType<Prisma.ProviderGrantCreateArgs> = z.object({ select: ProviderGrantSelectObjectSchema.optional(), include: ProviderGrantIncludeObjectSchema.optional(), data: z.union([ProviderGrantCreateInputObjectSchema, ProviderGrantUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ProviderGrantCreateArgs>;

export const ProviderGrantCreateOneZodSchema = z.object({ select: ProviderGrantSelectObjectSchema.optional(), include: ProviderGrantIncludeObjectSchema.optional(), data: z.union([ProviderGrantCreateInputObjectSchema, ProviderGrantUncheckedCreateInputObjectSchema]) }).strict();