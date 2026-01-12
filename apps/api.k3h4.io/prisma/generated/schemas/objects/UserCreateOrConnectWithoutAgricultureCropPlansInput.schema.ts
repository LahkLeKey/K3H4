import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAgricultureCropPlansInputObjectSchema as UserCreateWithoutAgricultureCropPlansInputObjectSchema } from './UserCreateWithoutAgricultureCropPlansInput.schema';
import { UserUncheckedCreateWithoutAgricultureCropPlansInputObjectSchema as UserUncheckedCreateWithoutAgricultureCropPlansInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureCropPlansInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureCropPlansInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureCropPlansInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAgricultureCropPlansInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAgricultureCropPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAgricultureCropPlansInput>;
export const UserCreateOrConnectWithoutAgricultureCropPlansInputObjectZodSchema = makeSchema();
