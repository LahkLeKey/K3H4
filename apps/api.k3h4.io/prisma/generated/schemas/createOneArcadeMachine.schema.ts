import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeMachineSelectObjectSchema as ArcadeMachineSelectObjectSchema } from './objects/ArcadeMachineSelect.schema';
import { ArcadeMachineIncludeObjectSchema as ArcadeMachineIncludeObjectSchema } from './objects/ArcadeMachineInclude.schema';
import { ArcadeMachineCreateInputObjectSchema as ArcadeMachineCreateInputObjectSchema } from './objects/ArcadeMachineCreateInput.schema';
import { ArcadeMachineUncheckedCreateInputObjectSchema as ArcadeMachineUncheckedCreateInputObjectSchema } from './objects/ArcadeMachineUncheckedCreateInput.schema';

export const ArcadeMachineCreateOneSchema: z.ZodType<Prisma.ArcadeMachineCreateArgs> = z.object({ select: ArcadeMachineSelectObjectSchema.optional(), include: ArcadeMachineIncludeObjectSchema.optional(), data: z.union([ArcadeMachineCreateInputObjectSchema, ArcadeMachineUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ArcadeMachineCreateArgs>;

export const ArcadeMachineCreateOneZodSchema = z.object({ select: ArcadeMachineSelectObjectSchema.optional(), include: ArcadeMachineIncludeObjectSchema.optional(), data: z.union([ArcadeMachineCreateInputObjectSchema, ArcadeMachineUncheckedCreateInputObjectSchema]) }).strict();