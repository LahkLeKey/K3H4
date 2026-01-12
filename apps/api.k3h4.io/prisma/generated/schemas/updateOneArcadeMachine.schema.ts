import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeMachineSelectObjectSchema as ArcadeMachineSelectObjectSchema } from './objects/ArcadeMachineSelect.schema';
import { ArcadeMachineIncludeObjectSchema as ArcadeMachineIncludeObjectSchema } from './objects/ArcadeMachineInclude.schema';
import { ArcadeMachineUpdateInputObjectSchema as ArcadeMachineUpdateInputObjectSchema } from './objects/ArcadeMachineUpdateInput.schema';
import { ArcadeMachineUncheckedUpdateInputObjectSchema as ArcadeMachineUncheckedUpdateInputObjectSchema } from './objects/ArcadeMachineUncheckedUpdateInput.schema';
import { ArcadeMachineWhereUniqueInputObjectSchema as ArcadeMachineWhereUniqueInputObjectSchema } from './objects/ArcadeMachineWhereUniqueInput.schema';

export const ArcadeMachineUpdateOneSchema: z.ZodType<Prisma.ArcadeMachineUpdateArgs> = z.object({ select: ArcadeMachineSelectObjectSchema.optional(), include: ArcadeMachineIncludeObjectSchema.optional(), data: z.union([ArcadeMachineUpdateInputObjectSchema, ArcadeMachineUncheckedUpdateInputObjectSchema]), where: ArcadeMachineWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeMachineUpdateArgs>;

export const ArcadeMachineUpdateOneZodSchema = z.object({ select: ArcadeMachineSelectObjectSchema.optional(), include: ArcadeMachineIncludeObjectSchema.optional(), data: z.union([ArcadeMachineUpdateInputObjectSchema, ArcadeMachineUncheckedUpdateInputObjectSchema]), where: ArcadeMachineWhereUniqueInputObjectSchema }).strict();