import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentTimecardSelectObjectSchema as AssignmentTimecardSelectObjectSchema } from './objects/AssignmentTimecardSelect.schema';
import { AssignmentTimecardUpdateManyMutationInputObjectSchema as AssignmentTimecardUpdateManyMutationInputObjectSchema } from './objects/AssignmentTimecardUpdateManyMutationInput.schema';
import { AssignmentTimecardWhereInputObjectSchema as AssignmentTimecardWhereInputObjectSchema } from './objects/AssignmentTimecardWhereInput.schema';

export const AssignmentTimecardUpdateManyAndReturnSchema: z.ZodType<Prisma.AssignmentTimecardUpdateManyAndReturnArgs> = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), data: AssignmentTimecardUpdateManyMutationInputObjectSchema, where: AssignmentTimecardWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AssignmentTimecardUpdateManyAndReturnArgs>;

export const AssignmentTimecardUpdateManyAndReturnZodSchema = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), data: AssignmentTimecardUpdateManyMutationInputObjectSchema, where: AssignmentTimecardWhereInputObjectSchema.optional() }).strict();