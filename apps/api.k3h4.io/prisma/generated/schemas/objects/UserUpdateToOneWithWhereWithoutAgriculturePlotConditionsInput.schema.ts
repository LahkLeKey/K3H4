import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutAgriculturePlotConditionsInputObjectSchema as UserUpdateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserUpdateWithoutAgriculturePlotConditionsInput.schema';
import { UserUncheckedUpdateWithoutAgriculturePlotConditionsInputObjectSchema as UserUncheckedUpdateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserUncheckedUpdateWithoutAgriculturePlotConditionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutAgriculturePlotConditionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgriculturePlotConditionsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutAgriculturePlotConditionsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgriculturePlotConditionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgriculturePlotConditionsInput>;
export const UserUpdateToOneWithWhereWithoutAgriculturePlotConditionsInputObjectZodSchema = makeSchema();
