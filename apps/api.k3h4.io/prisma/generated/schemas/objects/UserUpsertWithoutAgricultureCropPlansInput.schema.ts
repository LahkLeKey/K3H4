import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutAgricultureCropPlansInputObjectSchema as UserUpdateWithoutAgricultureCropPlansInputObjectSchema } from './UserUpdateWithoutAgricultureCropPlansInput.schema';
import { UserUncheckedUpdateWithoutAgricultureCropPlansInputObjectSchema as UserUncheckedUpdateWithoutAgricultureCropPlansInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureCropPlansInput.schema';
import { UserCreateWithoutAgricultureCropPlansInputObjectSchema as UserCreateWithoutAgricultureCropPlansInputObjectSchema } from './UserCreateWithoutAgricultureCropPlansInput.schema';
import { UserUncheckedCreateWithoutAgricultureCropPlansInputObjectSchema as UserUncheckedCreateWithoutAgricultureCropPlansInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureCropPlansInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAgricultureCropPlansInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureCropPlansInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureCropPlansInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureCropPlansInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutAgricultureCropPlansInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutAgricultureCropPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutAgricultureCropPlansInput>;
export const UserUpsertWithoutAgricultureCropPlansInputObjectZodSchema = makeSchema();
