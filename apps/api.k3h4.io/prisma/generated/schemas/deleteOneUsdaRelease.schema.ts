import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaReleaseSelectObjectSchema as UsdaReleaseSelectObjectSchema } from './objects/UsdaReleaseSelect.schema';
import { UsdaReleaseWhereUniqueInputObjectSchema as UsdaReleaseWhereUniqueInputObjectSchema } from './objects/UsdaReleaseWhereUniqueInput.schema';

export const UsdaReleaseDeleteOneSchema: z.ZodType<Prisma.UsdaReleaseDeleteArgs> = z.object({ select: UsdaReleaseSelectObjectSchema.optional(),  where: UsdaReleaseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseDeleteArgs>;

export const UsdaReleaseDeleteOneZodSchema = z.object({ select: UsdaReleaseSelectObjectSchema.optional(),  where: UsdaReleaseWhereUniqueInputObjectSchema }).strict();