import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAgriculturePlotConditionsInputObjectSchema as UserCreateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserCreateWithoutAgriculturePlotConditionsInput.schema';
import { UserUncheckedCreateWithoutAgriculturePlotConditionsInputObjectSchema as UserUncheckedCreateWithoutAgriculturePlotConditionsInputObjectSchema } from './UserUncheckedCreateWithoutAgriculturePlotConditionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAgriculturePlotConditionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgriculturePlotConditionsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAgriculturePlotConditionsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAgriculturePlotConditionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAgriculturePlotConditionsInput>;
export const UserCreateOrConnectWithoutAgriculturePlotConditionsInputObjectZodSchema = makeSchema();
