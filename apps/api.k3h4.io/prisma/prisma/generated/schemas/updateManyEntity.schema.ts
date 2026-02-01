import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityUpdateManyMutationInputObjectSchema as EntityUpdateManyMutationInputObjectSchema } from './objects/EntityUpdateManyMutationInput.schema';
import { EntityWhereInputObjectSchema as EntityWhereInputObjectSchema } from './objects/EntityWhereInput.schema';

export const EntityUpdateManySchema: z.ZodType<Prisma.EntityUpdateManyArgs> = z.object({ data: EntityUpdateManyMutationInputObjectSchema, where: EntityWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EntityUpdateManyArgs>;

export const EntityUpdateManyZodSchema = z.object({ data: EntityUpdateManyMutationInputObjectSchema, where: EntityWhereInputObjectSchema.optional() }).strict();