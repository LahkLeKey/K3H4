import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntitySelectObjectSchema as EntitySelectObjectSchema } from './objects/EntitySelect.schema';
import { EntityCreateManyInputObjectSchema as EntityCreateManyInputObjectSchema } from './objects/EntityCreateManyInput.schema';

export const EntityCreateManyAndReturnSchema: z.ZodType<Prisma.EntityCreateManyAndReturnArgs> = z.object({ select: EntitySelectObjectSchema.optional(), data: z.union([ EntityCreateManyInputObjectSchema, z.array(EntityCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.EntityCreateManyAndReturnArgs>;

export const EntityCreateManyAndReturnZodSchema = z.object({ select: EntitySelectObjectSchema.optional(), data: z.union([ EntityCreateManyInputObjectSchema, z.array(EntityCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();