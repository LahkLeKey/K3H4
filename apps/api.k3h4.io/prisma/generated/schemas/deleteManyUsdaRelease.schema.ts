import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaReleaseWhereInputObjectSchema as UsdaReleaseWhereInputObjectSchema } from './objects/UsdaReleaseWhereInput.schema';

export const UsdaReleaseDeleteManySchema: z.ZodType<Prisma.UsdaReleaseDeleteManyArgs> = z.object({ where: UsdaReleaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseDeleteManyArgs>;

export const UsdaReleaseDeleteManyZodSchema = z.object({ where: UsdaReleaseWhereInputObjectSchema.optional() }).strict();