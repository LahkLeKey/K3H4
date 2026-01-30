import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntitySelectObjectSchema as EntitySelectObjectSchema } from './objects/EntitySelect.schema';
import { EntityIncludeObjectSchema as EntityIncludeObjectSchema } from './objects/EntityInclude.schema';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './objects/EntityWhereUniqueInput.schema';

export const EntityFindUniqueOrThrowSchema: z.ZodType<Prisma.EntityFindUniqueOrThrowArgs> = z.object({ select: EntitySelectObjectSchema.optional(), include: EntityIncludeObjectSchema.optional(), where: EntityWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EntityFindUniqueOrThrowArgs>;

export const EntityFindUniqueOrThrowZodSchema = z.object({ select: EntitySelectObjectSchema.optional(), include: EntityIncludeObjectSchema.optional(), where: EntityWhereUniqueInputObjectSchema }).strict();