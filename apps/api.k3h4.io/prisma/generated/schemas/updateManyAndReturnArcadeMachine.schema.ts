import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeMachineSelectObjectSchema as ArcadeMachineSelectObjectSchema } from './objects/ArcadeMachineSelect.schema';
import { ArcadeMachineUpdateManyMutationInputObjectSchema as ArcadeMachineUpdateManyMutationInputObjectSchema } from './objects/ArcadeMachineUpdateManyMutationInput.schema';
import { ArcadeMachineWhereInputObjectSchema as ArcadeMachineWhereInputObjectSchema } from './objects/ArcadeMachineWhereInput.schema';

export const ArcadeMachineUpdateManyAndReturnSchema: z.ZodType<Prisma.ArcadeMachineUpdateManyAndReturnArgs> = z.object({ select: ArcadeMachineSelectObjectSchema.optional(), data: ArcadeMachineUpdateManyMutationInputObjectSchema, where: ArcadeMachineWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeMachineUpdateManyAndReturnArgs>;

export const ArcadeMachineUpdateManyAndReturnZodSchema = z.object({ select: ArcadeMachineSelectObjectSchema.optional(), data: ArcadeMachineUpdateManyMutationInputObjectSchema, where: ArcadeMachineWhereInputObjectSchema.optional() }).strict();