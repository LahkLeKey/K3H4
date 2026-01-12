import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutAgricultureCropPlansInputObjectSchema as UserUpdateWithoutAgricultureCropPlansInputObjectSchema } from './UserUpdateWithoutAgricultureCropPlansInput.schema';
import { UserUncheckedUpdateWithoutAgricultureCropPlansInputObjectSchema as UserUncheckedUpdateWithoutAgricultureCropPlansInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureCropPlansInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutAgricultureCropPlansInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureCropPlansInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutAgricultureCropPlansInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgricultureCropPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgricultureCropPlansInput>;
export const UserUpdateToOneWithWhereWithoutAgricultureCropPlansInputObjectZodSchema = makeSchema();
