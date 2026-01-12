import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeMachineSelectObjectSchema as ArcadeMachineSelectObjectSchema } from './objects/ArcadeMachineSelect.schema';
import { ArcadeMachineIncludeObjectSchema as ArcadeMachineIncludeObjectSchema } from './objects/ArcadeMachineInclude.schema';
import { ArcadeMachineWhereUniqueInputObjectSchema as ArcadeMachineWhereUniqueInputObjectSchema } from './objects/ArcadeMachineWhereUniqueInput.schema';

export const ArcadeMachineDeleteOneSchema: z.ZodType<Prisma.ArcadeMachineDeleteArgs> = z.object({ select: ArcadeMachineSelectObjectSchema.optional(), include: ArcadeMachineIncludeObjectSchema.optional(), where: ArcadeMachineWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeMachineDeleteArgs>;

export const ArcadeMachineDeleteOneZodSchema = z.object({ select: ArcadeMachineSelectObjectSchema.optional(), include: ArcadeMachineIncludeObjectSchema.optional(), where: ArcadeMachineWhereUniqueInputObjectSchema }).strict();