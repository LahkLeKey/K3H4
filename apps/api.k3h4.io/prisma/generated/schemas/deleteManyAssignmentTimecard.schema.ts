import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentTimecardWhereInputObjectSchema as AssignmentTimecardWhereInputObjectSchema } from './objects/AssignmentTimecardWhereInput.schema';

export const AssignmentTimecardDeleteManySchema: z.ZodType<Prisma.AssignmentTimecardDeleteManyArgs> = z.object({ where: AssignmentTimecardWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AssignmentTimecardDeleteManyArgs>;

export const AssignmentTimecardDeleteManyZodSchema = z.object({ where: AssignmentTimecardWhereInputObjectSchema.optional() }).strict();