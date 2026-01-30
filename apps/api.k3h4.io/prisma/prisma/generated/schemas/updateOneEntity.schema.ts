import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntitySelectObjectSchema as EntitySelectObjectSchema } from './objects/EntitySelect.schema';
import { EntityIncludeObjectSchema as EntityIncludeObjectSchema } from './objects/EntityInclude.schema';
import { EntityUpdateInputObjectSchema as EntityUpdateInputObjectSchema } from './objects/EntityUpdateInput.schema';
import { EntityUncheckedUpdateInputObjectSchema as EntityUncheckedUpdateInputObjectSchema } from './objects/EntityUncheckedUpdateInput.schema';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './objects/EntityWhereUniqueInput.schema';

export const EntityUpdateOneSchema: z.ZodType<Prisma.EntityUpdateArgs> = z.object({ select: EntitySelectObjectSchema.optional(), include: EntityIncludeObjectSchema.optional(), data: z.union([EntityUpdateInputObjectSchema, EntityUncheckedUpdateInputObjectSchema]), where: EntityWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EntityUpdateArgs>;

export const EntityUpdateOneZodSchema = z.object({ select: EntitySelectObjectSchema.optional(), include: EntityIncludeObjectSchema.optional(), data: z.union([EntityUpdateInputObjectSchema, EntityUncheckedUpdateInputObjectSchema]), where: EntityWhereUniqueInputObjectSchema }).strict();