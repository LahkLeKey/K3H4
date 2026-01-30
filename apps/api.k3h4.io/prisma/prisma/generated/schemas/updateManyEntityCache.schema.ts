import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityCacheUpdateManyMutationInputObjectSchema as EntityCacheUpdateManyMutationInputObjectSchema } from './objects/EntityCacheUpdateManyMutationInput.schema';
import { EntityCacheWhereInputObjectSchema as EntityCacheWhereInputObjectSchema } from './objects/EntityCacheWhereInput.schema';

export const EntityCacheUpdateManySchema: z.ZodType<Prisma.EntityCacheUpdateManyArgs> = z.object({ data: EntityCacheUpdateManyMutationInputObjectSchema, where: EntityCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EntityCacheUpdateManyArgs>;

export const EntityCacheUpdateManyZodSchema = z.object({ data: EntityCacheUpdateManyMutationInputObjectSchema, where: EntityCacheWhereInputObjectSchema.optional() }).strict();