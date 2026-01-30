import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityCacheSelectObjectSchema as EntityCacheSelectObjectSchema } from './objects/EntityCacheSelect.schema';
import { EntityCacheIncludeObjectSchema as EntityCacheIncludeObjectSchema } from './objects/EntityCacheInclude.schema';
import { EntityCacheCreateInputObjectSchema as EntityCacheCreateInputObjectSchema } from './objects/EntityCacheCreateInput.schema';
import { EntityCacheUncheckedCreateInputObjectSchema as EntityCacheUncheckedCreateInputObjectSchema } from './objects/EntityCacheUncheckedCreateInput.schema';

export const EntityCacheCreateOneSchema: z.ZodType<Prisma.EntityCacheCreateArgs> = z.object({ select: EntityCacheSelectObjectSchema.optional(), include: EntityCacheIncludeObjectSchema.optional(), data: z.union([EntityCacheCreateInputObjectSchema, EntityCacheUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.EntityCacheCreateArgs>;

export const EntityCacheCreateOneZodSchema = z.object({ select: EntityCacheSelectObjectSchema.optional(), include: EntityCacheIncludeObjectSchema.optional(), data: z.union([EntityCacheCreateInputObjectSchema, EntityCacheUncheckedCreateInputObjectSchema]) }).strict();