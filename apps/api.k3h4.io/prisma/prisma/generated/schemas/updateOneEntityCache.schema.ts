import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityCacheSelectObjectSchema as EntityCacheSelectObjectSchema } from './objects/EntityCacheSelect.schema';
import { EntityCacheIncludeObjectSchema as EntityCacheIncludeObjectSchema } from './objects/EntityCacheInclude.schema';
import { EntityCacheUpdateInputObjectSchema as EntityCacheUpdateInputObjectSchema } from './objects/EntityCacheUpdateInput.schema';
import { EntityCacheUncheckedUpdateInputObjectSchema as EntityCacheUncheckedUpdateInputObjectSchema } from './objects/EntityCacheUncheckedUpdateInput.schema';
import { EntityCacheWhereUniqueInputObjectSchema as EntityCacheWhereUniqueInputObjectSchema } from './objects/EntityCacheWhereUniqueInput.schema';

export const EntityCacheUpdateOneSchema: z.ZodType<Prisma.EntityCacheUpdateArgs> = z.object({ select: EntityCacheSelectObjectSchema.optional(), include: EntityCacheIncludeObjectSchema.optional(), data: z.union([EntityCacheUpdateInputObjectSchema, EntityCacheUncheckedUpdateInputObjectSchema]), where: EntityCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EntityCacheUpdateArgs>;

export const EntityCacheUpdateOneZodSchema = z.object({ select: EntityCacheSelectObjectSchema.optional(), include: EntityCacheIncludeObjectSchema.optional(), data: z.union([EntityCacheUpdateInputObjectSchema, EntityCacheUncheckedUpdateInputObjectSchema]), where: EntityCacheWhereUniqueInputObjectSchema }).strict();