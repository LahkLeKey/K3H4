import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntitySelectObjectSchema as EntitySelectObjectSchema } from './objects/EntitySelect.schema';
import { EntityIncludeObjectSchema as EntityIncludeObjectSchema } from './objects/EntityInclude.schema';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './objects/EntityWhereUniqueInput.schema';
import { EntityCreateInputObjectSchema as EntityCreateInputObjectSchema } from './objects/EntityCreateInput.schema';
import { EntityUncheckedCreateInputObjectSchema as EntityUncheckedCreateInputObjectSchema } from './objects/EntityUncheckedCreateInput.schema';
import { EntityUpdateInputObjectSchema as EntityUpdateInputObjectSchema } from './objects/EntityUpdateInput.schema';
import { EntityUncheckedUpdateInputObjectSchema as EntityUncheckedUpdateInputObjectSchema } from './objects/EntityUncheckedUpdateInput.schema';

export const EntityUpsertOneSchema: z.ZodType<Prisma.EntityUpsertArgs> = z.object({ select: EntitySelectObjectSchema.optional(), include: EntityIncludeObjectSchema.optional(), where: EntityWhereUniqueInputObjectSchema, create: z.union([ EntityCreateInputObjectSchema, EntityUncheckedCreateInputObjectSchema ]), update: z.union([ EntityUpdateInputObjectSchema, EntityUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.EntityUpsertArgs>;

export const EntityUpsertOneZodSchema = z.object({ select: EntitySelectObjectSchema.optional(), include: EntityIncludeObjectSchema.optional(), where: EntityWhereUniqueInputObjectSchema, create: z.union([ EntityCreateInputObjectSchema, EntityUncheckedCreateInputObjectSchema ]), update: z.union([ EntityUpdateInputObjectSchema, EntityUncheckedUpdateInputObjectSchema ]) }).strict();