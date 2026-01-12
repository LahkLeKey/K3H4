import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentTimecardSelectObjectSchema as AssignmentTimecardSelectObjectSchema } from './objects/AssignmentTimecardSelect.schema';
import { AssignmentTimecardIncludeObjectSchema as AssignmentTimecardIncludeObjectSchema } from './objects/AssignmentTimecardInclude.schema';
import { AssignmentTimecardWhereUniqueInputObjectSchema as AssignmentTimecardWhereUniqueInputObjectSchema } from './objects/AssignmentTimecardWhereUniqueInput.schema';

export const AssignmentTimecardDeleteOneSchema: z.ZodType<Prisma.AssignmentTimecardDeleteArgs> = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), include: AssignmentTimecardIncludeObjectSchema.optional(), where: AssignmentTimecardWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AssignmentTimecardDeleteArgs>;

export const AssignmentTimecardDeleteOneZodSchema = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), include: AssignmentTimecardIncludeObjectSchema.optional(), where: AssignmentTimecardWhereUniqueInputObjectSchema }).strict();