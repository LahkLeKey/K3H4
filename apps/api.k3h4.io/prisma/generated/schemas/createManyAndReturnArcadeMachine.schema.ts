import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeMachineSelectObjectSchema as ArcadeMachineSelectObjectSchema } from './objects/ArcadeMachineSelect.schema';
import { ArcadeMachineCreateManyInputObjectSchema as ArcadeMachineCreateManyInputObjectSchema } from './objects/ArcadeMachineCreateManyInput.schema';

export const ArcadeMachineCreateManyAndReturnSchema: z.ZodType<Prisma.ArcadeMachineCreateManyAndReturnArgs> = z.object({ select: ArcadeMachineSelectObjectSchema.optional(), data: z.union([ ArcadeMachineCreateManyInputObjectSchema, z.array(ArcadeMachineCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeMachineCreateManyAndReturnArgs>;

export const ArcadeMachineCreateManyAndReturnZodSchema = z.object({ select: ArcadeMachineSelectObjectSchema.optional(), data: z.union([ ArcadeMachineCreateManyInputObjectSchema, z.array(ArcadeMachineCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();