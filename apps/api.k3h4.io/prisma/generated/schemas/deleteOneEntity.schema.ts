import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntitySelectObjectSchema as EntitySelectObjectSchema } from './objects/EntitySelect.schema';
import { EntityIncludeObjectSchema as EntityIncludeObjectSchema } from './objects/EntityInclude.schema';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './objects/EntityWhereUniqueInput.schema';

export const EntityDeleteOneSchema: z.ZodType<Prisma.EntityDeleteArgs> = z.object({ select: EntitySelectObjectSchema.optional(), include: EntityIncludeObjectSchema.optional(), where: EntityWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EntityDeleteArgs>;

export const EntityDeleteOneZodSchema = z.object({ select: EntitySelectObjectSchema.optional(), include: EntityIncludeObjectSchema.optional(), where: EntityWhereUniqueInputObjectSchema }).strict();