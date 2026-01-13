import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentTimecardSelectObjectSchema as AssignmentTimecardSelectObjectSchema } from './objects/AssignmentTimecardSelect.schema';
import { AssignmentTimecardIncludeObjectSchema as AssignmentTimecardIncludeObjectSchema } from './objects/AssignmentTimecardInclude.schema';
import { AssignmentTimecardWhereUniqueInputObjectSchema as AssignmentTimecardWhereUniqueInputObjectSchema } from './objects/AssignmentTimecardWhereUniqueInput.schema';

export const AssignmentTimecardFindUniqueOrThrowSchema: z.ZodType<Prisma.AssignmentTimecardFindUniqueOrThrowArgs> = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), include: AssignmentTimecardIncludeObjectSchema.optional(), where: AssignmentTimecardWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AssignmentTimecardFindUniqueOrThrowArgs>;

export const AssignmentTimecardFindUniqueOrThrowZodSchema = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), include: AssignmentTimecardIncludeObjectSchema.optional(), where: AssignmentTimecardWhereUniqueInputObjectSchema }).strict();