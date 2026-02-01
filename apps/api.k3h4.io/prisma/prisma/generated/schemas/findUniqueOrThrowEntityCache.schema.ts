import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityCacheSelectObjectSchema as EntityCacheSelectObjectSchema } from './objects/EntityCacheSelect.schema';
import { EntityCacheIncludeObjectSchema as EntityCacheIncludeObjectSchema } from './objects/EntityCacheInclude.schema';
import { EntityCacheWhereUniqueInputObjectSchema as EntityCacheWhereUniqueInputObjectSchema } from './objects/EntityCacheWhereUniqueInput.schema';

export const EntityCacheFindUniqueOrThrowSchema: z.ZodType<Prisma.EntityCacheFindUniqueOrThrowArgs> = z.object({ select: EntityCacheSelectObjectSchema.optional(), include: EntityCacheIncludeObjectSchema.optional(), where: EntityCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EntityCacheFindUniqueOrThrowArgs>;

export const EntityCacheFindUniqueOrThrowZodSchema = z.object({ select: EntityCacheSelectObjectSchema.optional(), include: EntityCacheIncludeObjectSchema.optional(), where: EntityCacheWhereUniqueInputObjectSchema }).strict();