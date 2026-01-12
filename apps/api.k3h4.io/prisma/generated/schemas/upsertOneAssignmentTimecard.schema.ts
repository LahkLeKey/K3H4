import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentTimecardSelectObjectSchema as AssignmentTimecardSelectObjectSchema } from './objects/AssignmentTimecardSelect.schema';
import { AssignmentTimecardIncludeObjectSchema as AssignmentTimecardIncludeObjectSchema } from './objects/AssignmentTimecardInclude.schema';
import { AssignmentTimecardWhereUniqueInputObjectSchema as AssignmentTimecardWhereUniqueInputObjectSchema } from './objects/AssignmentTimecardWhereUniqueInput.schema';
import { AssignmentTimecardCreateInputObjectSchema as AssignmentTimecardCreateInputObjectSchema } from './objects/AssignmentTimecardCreateInput.schema';
import { AssignmentTimecardUncheckedCreateInputObjectSchema as AssignmentTimecardUncheckedCreateInputObjectSchema } from './objects/AssignmentTimecardUncheckedCreateInput.schema';
import { AssignmentTimecardUpdateInputObjectSchema as AssignmentTimecardUpdateInputObjectSchema } from './objects/AssignmentTimecardUpdateInput.schema';
import { AssignmentTimecardUncheckedUpdateInputObjectSchema as AssignmentTimecardUncheckedUpdateInputObjectSchema } from './objects/AssignmentTimecardUncheckedUpdateInput.schema';

export const AssignmentTimecardUpsertOneSchema: z.ZodType<Prisma.AssignmentTimecardUpsertArgs> = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), include: AssignmentTimecardIncludeObjectSchema.optional(), where: AssignmentTimecardWhereUniqueInputObjectSchema, create: z.union([ AssignmentTimecardCreateInputObjectSchema, AssignmentTimecardUncheckedCreateInputObjectSchema ]), update: z.union([ AssignmentTimecardUpdateInputObjectSchema, AssignmentTimecardUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AssignmentTimecardUpsertArgs>;

export const AssignmentTimecardUpsertOneZodSchema = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), include: AssignmentTimecardIncludeObjectSchema.optional(), where: AssignmentTimecardWhereUniqueInputObjectSchema, create: z.union([ AssignmentTimecardCreateInputObjectSchema, AssignmentTimecardUncheckedCreateInputObjectSchema ]), update: z.union([ AssignmentTimecardUpdateInputObjectSchema, AssignmentTimecardUncheckedUpdateInputObjectSchema ]) }).strict();