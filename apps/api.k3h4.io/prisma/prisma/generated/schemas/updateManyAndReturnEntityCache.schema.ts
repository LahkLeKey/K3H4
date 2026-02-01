import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityCacheSelectObjectSchema as EntityCacheSelectObjectSchema } from './objects/EntityCacheSelect.schema';
import { EntityCacheUpdateManyMutationInputObjectSchema as EntityCacheUpdateManyMutationInputObjectSchema } from './objects/EntityCacheUpdateManyMutationInput.schema';
import { EntityCacheWhereInputObjectSchema as EntityCacheWhereInputObjectSchema } from './objects/EntityCacheWhereInput.schema';

export const EntityCacheUpdateManyAndReturnSchema: z.ZodType<Prisma.EntityCacheUpdateManyAndReturnArgs> = z.object({ select: EntityCacheSelectObjectSchema.optional(), data: EntityCacheUpdateManyMutationInputObjectSchema, where: EntityCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EntityCacheUpdateManyAndReturnArgs>;

export const EntityCacheUpdateManyAndReturnZodSchema = z.object({ select: EntityCacheSelectObjectSchema.optional(), data: EntityCacheUpdateManyMutationInputObjectSchema, where: EntityCacheWhereInputObjectSchema.optional() }).strict();