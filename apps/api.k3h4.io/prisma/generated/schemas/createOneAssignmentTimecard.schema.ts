import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentTimecardSelectObjectSchema as AssignmentTimecardSelectObjectSchema } from './objects/AssignmentTimecardSelect.schema';
import { AssignmentTimecardIncludeObjectSchema as AssignmentTimecardIncludeObjectSchema } from './objects/AssignmentTimecardInclude.schema';
import { AssignmentTimecardCreateInputObjectSchema as AssignmentTimecardCreateInputObjectSchema } from './objects/AssignmentTimecardCreateInput.schema';
import { AssignmentTimecardUncheckedCreateInputObjectSchema as AssignmentTimecardUncheckedCreateInputObjectSchema } from './objects/AssignmentTimecardUncheckedCreateInput.schema';

export const AssignmentTimecardCreateOneSchema: z.ZodType<Prisma.AssignmentTimecardCreateArgs> = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), include: AssignmentTimecardIncludeObjectSchema.optional(), data: z.union([AssignmentTimecardCreateInputObjectSchema, AssignmentTimecardUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AssignmentTimecardCreateArgs>;

export const AssignmentTimecardCreateOneZodSchema = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), include: AssignmentTimecardIncludeObjectSchema.optional(), data: z.union([AssignmentTimecardCreateInputObjectSchema, AssignmentTimecardUncheckedCreateInputObjectSchema]) }).strict();