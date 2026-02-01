import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityCreateManyInputObjectSchema as EntityCreateManyInputObjectSchema } from './objects/EntityCreateManyInput.schema';

export const EntityCreateManySchema: z.ZodType<Prisma.EntityCreateManyArgs> = z.object({ data: z.union([ EntityCreateManyInputObjectSchema, z.array(EntityCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.EntityCreateManyArgs>;

export const EntityCreateManyZodSchema = z.object({ data: z.union([ EntityCreateManyInputObjectSchema, z.array(EntityCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();