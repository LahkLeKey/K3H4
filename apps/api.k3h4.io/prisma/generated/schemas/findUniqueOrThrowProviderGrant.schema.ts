import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProviderGrantSelectObjectSchema as ProviderGrantSelectObjectSchema } from './objects/ProviderGrantSelect.schema';
import { ProviderGrantIncludeObjectSchema as ProviderGrantIncludeObjectSchema } from './objects/ProviderGrantInclude.schema';
import { ProviderGrantWhereUniqueInputObjectSchema as ProviderGrantWhereUniqueInputObjectSchema } from './objects/ProviderGrantWhereUniqueInput.schema';

export const ProviderGrantFindUniqueOrThrowSchema: z.ZodType<Prisma.ProviderGrantFindUniqueOrThrowArgs> = z.object({ select: ProviderGrantSelectObjectSchema.optional(), include: ProviderGrantIncludeObjectSchema.optional(), where: ProviderGrantWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProviderGrantFindUniqueOrThrowArgs>;

export const ProviderGrantFindUniqueOrThrowZodSchema = z.object({ select: ProviderGrantSelectObjectSchema.optional(), include: ProviderGrantIncludeObjectSchema.optional(), where: ProviderGrantWhereUniqueInputObjectSchema }).strict();