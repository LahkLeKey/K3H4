import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgriculturePlotConditionsInputObjectSchema as UserCreateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserCreateWithoutAgriculturePlotConditionsInput.schema';
import { UserUncheckedCreateWithoutAgriculturePlotConditionsInputObjectSchema as UserUncheckedCreateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserUncheckedCreateWithoutAgriculturePlotConditionsInput.schema';
import { UserCreateOrConnectWithoutAgriculturePlotConditionsInputObjectSchema as UserCreateOrConnectWithoutAgriculturePlotConditionsInputObjectSchema } from './UserCreateOrConnectWithoutAgriculturePlotConditionsInput.schema';
import { UserUpsertWithoutAgriculturePlotConditionsInputObjectSchema as UserUpsertWithoutAgriculturePlotConditionsInputObjectSchema } from './UserUpsertWithoutAgriculturePlotConditionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutAgriculturePlotConditionsInputObjectSchema as UserUpdateToOneWithWhereWithoutAgriculturePlotConditionsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutAgriculturePlotConditionsInput.schema';
import { UserUpdateWithoutAgriculturePlotConditionsInputObjectSchema as UserUpdateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserUpdateWithoutAgriculturePlotConditionsInput.schema';
import { UserUncheckedUpdateWithoutAgriculturePlotConditionsInputObjectSchema as UserUncheckedUpdateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserUncheckedUpdateWithoutAgriculturePlotConditionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgriculturePlotConditionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgriculturePlotConditionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgriculturePlotConditionsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAgriculturePlotConditionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutAgriculturePlotConditionsInputObjectSchema), z.lazy(() => UserUpdateWithoutAgriculturePlotConditionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgriculturePlotConditionsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutAgriculturePlotConditionsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgriculturePlotConditionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgriculturePlotConditionsNestedInput>;
export const UserUpdateOneRequiredWithoutAgriculturePlotConditionsNestedInputObjectZodSchema = makeSchema();
