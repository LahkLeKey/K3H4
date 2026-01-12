import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaReleaseSelectObjectSchema as UsdaReleaseSelectObjectSchema } from './objects/UsdaReleaseSelect.schema';
import { UsdaReleaseUpdateInputObjectSchema as UsdaReleaseUpdateInputObjectSchema } from './objects/UsdaReleaseUpdateInput.schema';
import { UsdaReleaseUncheckedUpdateInputObjectSchema as UsdaReleaseUncheckedUpdateInputObjectSchema } from './objects/UsdaReleaseUncheckedUpdateInput.schema';
import { UsdaReleaseWhereUniqueInputObjectSchema as UsdaReleaseWhereUniqueInputObjectSchema } from './objects/UsdaReleaseWhereUniqueInput.schema';

export const UsdaReleaseUpdateOneSchema: z.ZodType<Prisma.UsdaReleaseUpdateArgs> = z.object({ select: UsdaReleaseSelectObjectSchema.optional(),  data: z.union([UsdaReleaseUpdateInputObjectSchema, UsdaReleaseUncheckedUpdateInputObjectSchema]), where: UsdaReleaseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseUpdateArgs>;

export const UsdaReleaseUpdateOneZodSchema = z.object({ select: UsdaReleaseSelectObjectSchema.optional(),  data: z.union([UsdaReleaseUpdateInputObjectSchema, UsdaReleaseUncheckedUpdateInputObjectSchema]), where: UsdaReleaseWhereUniqueInputObjectSchema }).strict();