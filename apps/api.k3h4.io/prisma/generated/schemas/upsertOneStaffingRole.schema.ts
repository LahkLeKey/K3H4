import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingRoleSelectObjectSchema as StaffingRoleSelectObjectSchema } from './objects/StaffingRoleSelect.schema';
import { StaffingRoleIncludeObjectSchema as StaffingRoleIncludeObjectSchema } from './objects/StaffingRoleInclude.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './objects/StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleCreateInputObjectSchema as StaffingRoleCreateInputObjectSchema } from './objects/StaffingRoleCreateInput.schema';
import { StaffingRoleUncheckedCreateInputObjectSchema as StaffingRoleUncheckedCreateInputObjectSchema } from './objects/StaffingRoleUncheckedCreateInput.schema';
import { StaffingRoleUpdateInputObjectSchema as StaffingRoleUpdateInputObjectSchema } from './objects/StaffingRoleUpdateInput.schema';
import { StaffingRoleUncheckedUpdateInputObjectSchema as StaffingRoleUncheckedUpdateInputObjectSchema } from './objects/StaffingRoleUncheckedUpdateInput.schema';

export const StaffingRoleUpsertOneSchema: z.ZodType<Prisma.StaffingRoleUpsertArgs> = z.object({ select: StaffingRoleSelectObjectSchema.optional(), include: StaffingRoleIncludeObjectSchema.optional(), where: StaffingRoleWhereUniqueInputObjectSchema, create: z.union([ StaffingRoleCreateInputObjectSchema, StaffingRoleUncheckedCreateInputObjectSchema ]), update: z.union([ StaffingRoleUpdateInputObjectSchema, StaffingRoleUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.StaffingRoleUpsertArgs>;

export const StaffingRoleUpsertOneZodSchema = z.object({ select: StaffingRoleSelectObjectSchema.optional(), include: StaffingRoleIncludeObjectSchema.optional(), where: StaffingRoleWhereUniqueInputObjectSchema, create: z.union([ StaffingRoleCreateInputObjectSchema, StaffingRoleUncheckedCreateInputObjectSchema ]), update: z.union([ StaffingRoleUpdateInputObjectSchema, StaffingRoleUncheckedUpdateInputObjectSchema ]) }).strict();