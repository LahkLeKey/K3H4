import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentTimecardSelectObjectSchema as AssignmentTimecardSelectObjectSchema } from './objects/AssignmentTimecardSelect.schema';
import { AssignmentTimecardIncludeObjectSchema as AssignmentTimecardIncludeObjectSchema } from './objects/AssignmentTimecardInclude.schema';
import { AssignmentTimecardUpdateInputObjectSchema as AssignmentTimecardUpdateInputObjectSchema } from './objects/AssignmentTimecardUpdateInput.schema';
import { AssignmentTimecardUncheckedUpdateInputObjectSchema as AssignmentTimecardUncheckedUpdateInputObjectSchema } from './objects/AssignmentTimecardUncheckedUpdateInput.schema';
import { AssignmentTimecardWhereUniqueInputObjectSchema as AssignmentTimecardWhereUniqueInputObjectSchema } from './objects/AssignmentTimecardWhereUniqueInput.schema';

export const AssignmentTimecardUpdateOneSchema: z.ZodType<Prisma.AssignmentTimecardUpdateArgs> = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), include: AssignmentTimecardIncludeObjectSchema.optional(), data: z.union([AssignmentTimecardUpdateInputObjectSchema, AssignmentTimecardUncheckedUpdateInputObjectSchema]), where: AssignmentTimecardWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AssignmentTimecardUpdateArgs>;

export const AssignmentTimecardUpdateOneZodSchema = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), include: AssignmentTimecardIncludeObjectSchema.optional(), data: z.union([AssignmentTimecardUpdateInputObjectSchema, AssignmentTimecardUncheckedUpdateInputObjectSchema]), where: AssignmentTimecardWhereUniqueInputObjectSchema }).strict();