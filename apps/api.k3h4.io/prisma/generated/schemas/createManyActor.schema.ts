import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorCreateManyInputObjectSchema as ActorCreateManyInputObjectSchema } from './objects/ActorCreateManyInput.schema';

export const ActorCreateManySchema: z.ZodType<Prisma.ActorCreateManyArgs> = z.object({ data: z.union([ ActorCreateManyInputObjectSchema, z.array(ActorCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ActorCreateManyArgs>;

export const ActorCreateManyZodSchema = z.object({ data: z.union([ ActorCreateManyInputObjectSchema, z.array(ActorCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();