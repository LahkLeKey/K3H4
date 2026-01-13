import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaReleaseSelectObjectSchema as UsdaReleaseSelectObjectSchema } from './objects/UsdaReleaseSelect.schema';
import { UsdaReleaseCreateInputObjectSchema as UsdaReleaseCreateInputObjectSchema } from './objects/UsdaReleaseCreateInput.schema';
import { UsdaReleaseUncheckedCreateInputObjectSchema as UsdaReleaseUncheckedCreateInputObjectSchema } from './objects/UsdaReleaseUncheckedCreateInput.schema';

export const UsdaReleaseCreateOneSchema: z.ZodType<Prisma.UsdaReleaseCreateArgs> = z.object({ select: UsdaReleaseSelectObjectSchema.optional(),  data: z.union([UsdaReleaseCreateInputObjectSchema, UsdaReleaseUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseCreateArgs>;

export const UsdaReleaseCreateOneZodSchema = z.object({ select: UsdaReleaseSelectObjectSchema.optional(),  data: z.union([UsdaReleaseCreateInputObjectSchema, UsdaReleaseUncheckedCreateInputObjectSchema]) }).strict();