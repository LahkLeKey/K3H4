import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityCacheWhereInputObjectSchema as EntityCacheWhereInputObjectSchema } from './objects/EntityCacheWhereInput.schema';

export const EntityCacheDeleteManySchema: z.ZodType<Prisma.EntityCacheDeleteManyArgs> = z.object({ where: EntityCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EntityCacheDeleteManyArgs>;

export const EntityCacheDeleteManyZodSchema = z.object({ where: EntityCacheWhereInputObjectSchema.optional() }).strict();