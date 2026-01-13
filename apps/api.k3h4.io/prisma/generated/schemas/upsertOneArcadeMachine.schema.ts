import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeMachineSelectObjectSchema as ArcadeMachineSelectObjectSchema } from './objects/ArcadeMachineSelect.schema';
import { ArcadeMachineIncludeObjectSchema as ArcadeMachineIncludeObjectSchema } from './objects/ArcadeMachineInclude.schema';
import { ArcadeMachineWhereUniqueInputObjectSchema as ArcadeMachineWhereUniqueInputObjectSchema } from './objects/ArcadeMachineWhereUniqueInput.schema';
import { ArcadeMachineCreateInputObjectSchema as ArcadeMachineCreateInputObjectSchema } from './objects/ArcadeMachineCreateInput.schema';
import { ArcadeMachineUncheckedCreateInputObjectSchema as ArcadeMachineUncheckedCreateInputObjectSchema } from './objects/ArcadeMachineUncheckedCreateInput.schema';
import { ArcadeMachineUpdateInputObjectSchema as ArcadeMachineUpdateInputObjectSchema } from './objects/ArcadeMachineUpdateInput.schema';
import { ArcadeMachineUncheckedUpdateInputObjectSchema as ArcadeMachineUncheckedUpdateInputObjectSchema } from './objects/ArcadeMachineUncheckedUpdateInput.schema';

export const ArcadeMachineUpsertOneSchema: z.ZodType<Prisma.ArcadeMachineUpsertArgs> = z.object({ select: ArcadeMachineSelectObjectSchema.optional(), include: ArcadeMachineIncludeObjectSchema.optional(), where: ArcadeMachineWhereUniqueInputObjectSchema, create: z.union([ ArcadeMachineCreateInputObjectSchema, ArcadeMachineUncheckedCreateInputObjectSchema ]), update: z.union([ ArcadeMachineUpdateInputObjectSchema, ArcadeMachineUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ArcadeMachineUpsertArgs>;

export const ArcadeMachineUpsertOneZodSchema = z.object({ select: ArcadeMachineSelectObjectSchema.optional(), include: ArcadeMachineIncludeObjectSchema.optional(), where: ArcadeMachineWhereUniqueInputObjectSchema, create: z.union([ ArcadeMachineCreateInputObjectSchema, ArcadeMachineUncheckedCreateInputObjectSchema ]), update: z.union([ ArcadeMachineUpdateInputObjectSchema, ArcadeMachineUncheckedUpdateInputObjectSchema ]) }).strict();