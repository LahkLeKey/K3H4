import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaReleaseUpdateManyMutationInputObjectSchema as UsdaReleaseUpdateManyMutationInputObjectSchema } from './objects/UsdaReleaseUpdateManyMutationInput.schema';
import { UsdaReleaseWhereInputObjectSchema as UsdaReleaseWhereInputObjectSchema } from './objects/UsdaReleaseWhereInput.schema';

export const UsdaReleaseUpdateManySchema: z.ZodType<Prisma.UsdaReleaseUpdateManyArgs> = z.object({ data: UsdaReleaseUpdateManyMutationInputObjectSchema, where: UsdaReleaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseUpdateManyArgs>;

export const UsdaReleaseUpdateManyZodSchema = z.object({ data: UsdaReleaseUpdateManyMutationInputObjectSchema, where: UsdaReleaseWhereInputObjectSchema.optional() }).strict();