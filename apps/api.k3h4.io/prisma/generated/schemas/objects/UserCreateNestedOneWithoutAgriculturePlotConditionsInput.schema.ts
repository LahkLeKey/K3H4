import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgriculturePlotConditionsInputObjectSchema as UserCreateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserCreateWithoutAgriculturePlotConditionsInput.schema';
import { UserUncheckedCreateWithoutAgriculturePlotConditionsInputObjectSchema as UserUncheckedCreateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserUncheckedCreateWithoutAgriculturePlotConditionsInput.schema';
import { UserCreateOrConnectWithoutAgriculturePlotConditionsInputObjectSchema as UserCreateOrConnectWithoutAgriculturePlotConditionsInputObjectSchema } from './UserCreateOrConnectWithoutAgriculturePlotConditionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgriculturePlotConditionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgriculturePlotConditionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgriculturePlotConditionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutAgriculturePlotConditionsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAgriculturePlotConditionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutAgriculturePlotConditionsInput>;
export const UserCreateNestedOneWithoutAgriculturePlotConditionsInputObjectZodSchema = makeSchema();
