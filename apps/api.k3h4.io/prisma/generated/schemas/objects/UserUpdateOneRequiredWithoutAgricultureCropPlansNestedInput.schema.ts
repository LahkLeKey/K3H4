import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgricultureCropPlansInputObjectSchema as UserCreateWithoutAgricultureCropPlansInputObjectSchema } from './UserCreateWithoutAgricultureCropPlansInput.schema';
import { UserUncheckedCreateWithoutAgricultureCropPlansInputObjectSchema as UserUncheckedCreateWithoutAgricultureCropPlansInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureCropPlansInput.schema';
import { UserCreateOrConnectWithoutAgricultureCropPlansInputObjectSchema as UserCreateOrConnectWithoutAgricultureCropPlansInputObjectSchema } from './UserCreateOrConnectWithoutAgricultureCropPlansInput.schema';
import { UserUpsertWithoutAgricultureCropPlansInputObjectSchema as UserUpsertWithoutAgricultureCropPlansInputObjectSchema } from './UserUpsertWithoutAgricultureCropPlansInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutAgricultureCropPlansInputObjectSchema as UserUpdateToOneWithWhereWithoutAgricultureCropPlansInputObjectSchema } from './UserUpdateToOneWithWhereWithoutAgricultureCropPlansInput.schema';
import { UserUpdateWithoutAgricultureCropPlansInputObjectSchema as UserUpdateWithoutAgricultureCropPlansInputObjectSchema } from './UserUpdateWithoutAgricultureCropPlansInput.schema';
import { UserUncheckedUpdateWithoutAgricultureCropPlansInputObjectSchema as UserUncheckedUpdateWithoutAgricultureCropPlansInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureCropPlansInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureCropPlansInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureCropPlansInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgricultureCropPlansInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAgricultureCropPlansInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutAgricultureCropPlansInputObjectSchema), z.lazy(() => UserUpdateWithoutAgricultureCropPlansInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureCropPlansInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutAgricultureCropPlansNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgricultureCropPlansNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgricultureCropPlansNestedInput>;
export const UserUpdateOneRequiredWithoutAgricultureCropPlansNestedInputObjectZodSchema = makeSchema();
