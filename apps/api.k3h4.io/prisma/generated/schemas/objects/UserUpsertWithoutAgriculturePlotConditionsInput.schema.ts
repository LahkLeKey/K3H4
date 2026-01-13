import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutAgriculturePlotConditionsInputObjectSchema as UserUpdateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserUpdateWithoutAgriculturePlotConditionsInput.schema';
import { UserUncheckedUpdateWithoutAgriculturePlotConditionsInputObjectSchema as UserUncheckedUpdateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserUncheckedUpdateWithoutAgriculturePlotConditionsInput.schema';
import { UserCreateWithoutAgriculturePlotConditionsInputObjectSchema as UserCreateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserCreateWithoutAgriculturePlotConditionsInput.schema';
import { UserUncheckedCreateWithoutAgriculturePlotConditionsInputObjectSchema as UserUncheckedCreateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserUncheckedCreateWithoutAgriculturePlotConditionsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAgriculturePlotConditionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgriculturePlotConditionsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAgriculturePlotConditionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgriculturePlotConditionsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutAgriculturePlotConditionsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutAgriculturePlotConditionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutAgriculturePlotConditionsInput>;
export const UserUpsertWithoutAgriculturePlotConditionsInputObjectZodSchema = makeSchema();
