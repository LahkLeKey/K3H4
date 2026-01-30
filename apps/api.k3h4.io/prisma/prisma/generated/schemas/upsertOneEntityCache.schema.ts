import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityCacheSelectObjectSchema as EntityCacheSelectObjectSchema } from './objects/EntityCacheSelect.schema';
import { EntityCacheIncludeObjectSchema as EntityCacheIncludeObjectSchema } from './objects/EntityCacheInclude.schema';
import { EntityCacheWhereUniqueInputObjectSchema as EntityCacheWhereUniqueInputObjectSchema } from './objects/EntityCacheWhereUniqueInput.schema';
import { EntityCacheCreateInputObjectSchema as EntityCacheCreateInputObjectSchema } from './objects/EntityCacheCreateInput.schema';
import { EntityCacheUncheckedCreateInputObjectSchema as EntityCacheUncheckedCreateInputObjectSchema } from './objects/EntityCacheUncheckedCreateInput.schema';
import { EntityCacheUpdateInputObjectSchema as EntityCacheUpdateInputObjectSchema } from './objects/EntityCacheUpdateInput.schema';
import { EntityCacheUncheckedUpdateInputObjectSchema as EntityCacheUncheckedUpdateInputObjectSchema } from './objects/EntityCacheUncheckedUpdateInput.schema';

export const EntityCacheUpsertOneSchema: z.ZodType<Prisma.EntityCacheUpsertArgs> = z.object({ select: EntityCacheSelectObjectSchema.optional(), include: EntityCacheIncludeObjectSchema.optional(), where: EntityCacheWhereUniqueInputObjectSchema, create: z.union([ EntityCacheCreateInputObjectSchema, EntityCacheUncheckedCreateInputObjectSchema ]), update: z.union([ EntityCacheUpdateInputObjectSchema, EntityCacheUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.EntityCacheUpsertArgs>;

export const EntityCacheUpsertOneZodSchema = z.object({ select: EntityCacheSelectObjectSchema.optional(), include: EntityCacheIncludeObjectSchema.optional(), where: EntityCacheWhereUniqueInputObjectSchema, create: z.union([ EntityCacheCreateInputObjectSchema, EntityCacheUncheckedCreateInputObjectSchema ]), update: z.union([ EntityCacheUpdateInputObjectSchema, EntityCacheUncheckedUpdateInputObjectSchema ]) }).strict();