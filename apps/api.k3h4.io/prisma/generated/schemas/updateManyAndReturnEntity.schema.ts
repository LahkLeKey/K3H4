import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntitySelectObjectSchema as EntitySelectObjectSchema } from './objects/EntitySelect.schema';
import { EntityUpdateManyMutationInputObjectSchema as EntityUpdateManyMutationInputObjectSchema } from './objects/EntityUpdateManyMutationInput.schema';
import { EntityWhereInputObjectSchema as EntityWhereInputObjectSchema } from './objects/EntityWhereInput.schema';

export const EntityUpdateManyAndReturnSchema: z.ZodType<Prisma.EntityUpdateManyAndReturnArgs> = z.object({ select: EntitySelectObjectSchema.optional(), data: EntityUpdateManyMutationInputObjectSchema, where: EntityWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EntityUpdateManyAndReturnArgs>;

export const EntityUpdateManyAndReturnZodSchema = z.object({ select: EntitySelectObjectSchema.optional(), data: EntityUpdateManyMutationInputObjectSchema, where: EntityWhereInputObjectSchema.optional() }).strict();