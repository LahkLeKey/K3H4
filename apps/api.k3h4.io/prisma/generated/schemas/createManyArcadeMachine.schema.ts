import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeMachineCreateManyInputObjectSchema as ArcadeMachineCreateManyInputObjectSchema } from './objects/ArcadeMachineCreateManyInput.schema';

export const ArcadeMachineCreateManySchema: z.ZodType<Prisma.ArcadeMachineCreateManyArgs> = z.object({ data: z.union([ ArcadeMachineCreateManyInputObjectSchema, z.array(ArcadeMachineCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeMachineCreateManyArgs>;

export const ArcadeMachineCreateManyZodSchema = z.object({ data: z.union([ ArcadeMachineCreateManyInputObjectSchema, z.array(ArcadeMachineCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();