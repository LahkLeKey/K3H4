import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityWhereInputObjectSchema as EntityWhereInputObjectSchema } from './objects/EntityWhereInput.schema';

export const EntityDeleteManySchema: z.ZodType<Prisma.EntityDeleteManyArgs> = z.object({ where: EntityWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EntityDeleteManyArgs>;

export const EntityDeleteManyZodSchema = z.object({ where: EntityWhereInputObjectSchema.optional() }).strict();