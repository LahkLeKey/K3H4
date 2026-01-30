import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProviderGrantSelectObjectSchema as ProviderGrantSelectObjectSchema } from './objects/ProviderGrantSelect.schema';
import { ProviderGrantUpdateManyMutationInputObjectSchema as ProviderGrantUpdateManyMutationInputObjectSchema } from './objects/ProviderGrantUpdateManyMutationInput.schema';
import { ProviderGrantWhereInputObjectSchema as ProviderGrantWhereInputObjectSchema } from './objects/ProviderGrantWhereInput.schema';

export const ProviderGrantUpdateManyAndReturnSchema: z.ZodType<Prisma.ProviderGrantUpdateManyAndReturnArgs> = z.object({ select: ProviderGrantSelectObjectSchema.optional(), data: ProviderGrantUpdateManyMutationInputObjectSchema, where: ProviderGrantWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProviderGrantUpdateManyAndReturnArgs>;

export const ProviderGrantUpdateManyAndReturnZodSchema = z.object({ select: ProviderGrantSelectObjectSchema.optional(), data: ProviderGrantUpdateManyMutationInputObjectSchema, where: ProviderGrantWhereInputObjectSchema.optional() }).strict();