import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaSyncStateSelectObjectSchema as UsdaSyncStateSelectObjectSchema } from './objects/UsdaSyncStateSelect.schema';
import { UsdaSyncStateCreateInputObjectSchema as UsdaSyncStateCreateInputObjectSchema } from './objects/UsdaSyncStateCreateInput.schema';
import { UsdaSyncStateUncheckedCreateInputObjectSchema as UsdaSyncStateUncheckedCreateInputObjectSchema } from './objects/UsdaSyncStateUncheckedCreateInput.schema';

export const UsdaSyncStateCreateOneSchema: z.ZodType<Prisma.UsdaSyncStateCreateArgs> = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(),  data: z.union([UsdaSyncStateCreateInputObjectSchema, UsdaSyncStateUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.UsdaSyncStateCreateArgs>;

export const UsdaSyncStateCreateOneZodSchema = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(),  data: z.union([UsdaSyncStateCreateInputObjectSchema, UsdaSyncStateUncheckedCreateInputObjectSchema]) }).strict();