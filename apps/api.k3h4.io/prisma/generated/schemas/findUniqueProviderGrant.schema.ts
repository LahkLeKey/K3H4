import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProviderGrantSelectObjectSchema as ProviderGrantSelectObjectSchema } from './objects/ProviderGrantSelect.schema';
import { ProviderGrantIncludeObjectSchema as ProviderGrantIncludeObjectSchema } from './objects/ProviderGrantInclude.schema';
import { ProviderGrantWhereUniqueInputObjectSchema as ProviderGrantWhereUniqueInputObjectSchema } from './objects/ProviderGrantWhereUniqueInput.schema';

export const ProviderGrantFindUniqueSchema: z.ZodType<Prisma.ProviderGrantFindUniqueArgs> = z.object({ select: ProviderGrantSelectObjectSchema.optional(), include: ProviderGrantIncludeObjectSchema.optional(), where: ProviderGrantWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProviderGrantFindUniqueArgs>;

export const ProviderGrantFindUniqueZodSchema = z.object({ select: ProviderGrantSelectObjectSchema.optional(), include: ProviderGrantIncludeObjectSchema.optional(), where: ProviderGrantWhereUniqueInputObjectSchema }).strict();