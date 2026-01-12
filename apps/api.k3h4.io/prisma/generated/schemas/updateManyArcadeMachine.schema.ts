import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeMachineUpdateManyMutationInputObjectSchema as ArcadeMachineUpdateManyMutationInputObjectSchema } from './objects/ArcadeMachineUpdateManyMutationInput.schema';
import { ArcadeMachineWhereInputObjectSchema as ArcadeMachineWhereInputObjectSchema } from './objects/ArcadeMachineWhereInput.schema';

export const ArcadeMachineUpdateManySchema: z.ZodType<Prisma.ArcadeMachineUpdateManyArgs> = z.object({ data: ArcadeMachineUpdateManyMutationInputObjectSchema, where: ArcadeMachineWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeMachineUpdateManyArgs>;

export const ArcadeMachineUpdateManyZodSchema = z.object({ data: ArcadeMachineUpdateManyMutationInputObjectSchema, where: ArcadeMachineWhereInputObjectSchema.optional() }).strict();