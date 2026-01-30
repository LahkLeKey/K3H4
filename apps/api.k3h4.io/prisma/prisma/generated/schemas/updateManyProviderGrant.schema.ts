import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProviderGrantUpdateManyMutationInputObjectSchema as ProviderGrantUpdateManyMutationInputObjectSchema } from './objects/ProviderGrantUpdateManyMutationInput.schema';
import { ProviderGrantWhereInputObjectSchema as ProviderGrantWhereInputObjectSchema } from './objects/ProviderGrantWhereInput.schema';

export const ProviderGrantUpdateManySchema: z.ZodType<Prisma.ProviderGrantUpdateManyArgs> = z.object({ data: ProviderGrantUpdateManyMutationInputObjectSchema, where: ProviderGrantWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProviderGrantUpdateManyArgs>;

export const ProviderGrantUpdateManyZodSchema = z.object({ data: ProviderGrantUpdateManyMutationInputObjectSchema, where: ProviderGrantWhereInputObjectSchema.optional() }).strict();