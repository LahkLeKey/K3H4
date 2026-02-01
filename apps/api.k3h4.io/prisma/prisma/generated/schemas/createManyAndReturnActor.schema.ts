import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorSelectObjectSchema as ActorSelectObjectSchema } from './objects/ActorSelect.schema';
import { ActorCreateManyInputObjectSchema as ActorCreateManyInputObjectSchema } from './objects/ActorCreateManyInput.schema';

export const ActorCreateManyAndReturnSchema: z.ZodType<Prisma.ActorCreateManyAndReturnArgs> = z.object({ select: ActorSelectObjectSchema.optional(), data: z.union([ ActorCreateManyInputObjectSchema, z.array(ActorCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ActorCreateManyAndReturnArgs>;

export const ActorCreateManyAndReturnZodSchema = z.object({ select: ActorSelectObjectSchema.optional(), data: z.union([ ActorCreateManyInputObjectSchema, z.array(ActorCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();