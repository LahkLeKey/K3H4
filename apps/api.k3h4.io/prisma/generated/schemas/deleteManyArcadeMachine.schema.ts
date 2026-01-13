import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeMachineWhereInputObjectSchema as ArcadeMachineWhereInputObjectSchema } from './objects/ArcadeMachineWhereInput.schema';

export const ArcadeMachineDeleteManySchema: z.ZodType<Prisma.ArcadeMachineDeleteManyArgs> = z.object({ where: ArcadeMachineWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeMachineDeleteManyArgs>;

export const ArcadeMachineDeleteManyZodSchema = z.object({ where: ArcadeMachineWhereInputObjectSchema.optional() }).strict();