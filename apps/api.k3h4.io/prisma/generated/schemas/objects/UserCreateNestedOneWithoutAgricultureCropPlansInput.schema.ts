import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgricultureCropPlansInputObjectSchema as UserCreateWithoutAgricultureCropPlansInputObjectSchema } from './UserCreateWithoutAgricultureCropPlansInput.schema';
import { UserUncheckedCreateWithoutAgricultureCropPlansInputObjectSchema as UserUncheckedCreateWithoutAgricultureCropPlansInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureCropPlansInput.schema';
import { UserCreateOrConnectWithoutAgricultureCropPlansInputObjectSchema as UserCreateOrConnectWithoutAgricultureCropPlansInputObjectSchema } from './UserCreateOrConnectWithoutAgricultureCropPlansInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureCropPlansInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureCropPlansInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgricultureCropPlansInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutAgricultureCropPlansInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAgricultureCropPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutAgricultureCropPlansInput>;
export const UserCreateNestedOneWithoutAgricultureCropPlansInputObjectZodSchema = makeSchema();
