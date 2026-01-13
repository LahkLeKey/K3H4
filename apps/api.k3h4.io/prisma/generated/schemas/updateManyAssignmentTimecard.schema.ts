import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentTimecardUpdateManyMutationInputObjectSchema as AssignmentTimecardUpdateManyMutationInputObjectSchema } from './objects/AssignmentTimecardUpdateManyMutationInput.schema';
import { AssignmentTimecardWhereInputObjectSchema as AssignmentTimecardWhereInputObjectSchema } from './objects/AssignmentTimecardWhereInput.schema';

export const AssignmentTimecardUpdateManySchema: z.ZodType<Prisma.AssignmentTimecardUpdateManyArgs> = z.object({ data: AssignmentTimecardUpdateManyMutationInputObjectSchema, where: AssignmentTimecardWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AssignmentTimecardUpdateManyArgs>;

export const AssignmentTimecardUpdateManyZodSchema = z.object({ data: AssignmentTimecardUpdateManyMutationInputObjectSchema, where: AssignmentTimecardWhereInputObjectSchema.optional() }).strict();