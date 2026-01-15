import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingRoleSelectObjectSchema as StaffingRoleSelectObjectSchema } from './objects/StaffingRoleSelect.schema';
import { StaffingRoleUpdateManyMutationInputObjectSchema as StaffingRoleUpdateManyMutationInputObjectSchema } from './objects/StaffingRoleUpdateManyMutationInput.schema';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './objects/StaffingRoleWhereInput.schema';

export const StaffingRoleUpdateManyAndReturnSchema: z.ZodType<Prisma.StaffingRoleUpdateManyAndReturnArgs> = z.object({ select: StaffingRoleSelectObjectSchema.optional(), data: StaffingRoleUpdateManyMutationInputObjectSchema, where: StaffingRoleWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingRoleUpdateManyAndReturnArgs>;

export const StaffingRoleUpdateManyAndReturnZodSchema = z.object({ select: StaffingRoleSelectObjectSchema.optional(), data: StaffingRoleUpdateManyMutationInputObjectSchema, where: StaffingRoleWhereInputObjectSchema.optional() }).strict();