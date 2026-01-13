import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaReleaseSelectObjectSchema as UsdaReleaseSelectObjectSchema } from './objects/UsdaReleaseSelect.schema';
import { UsdaReleaseUpdateManyMutationInputObjectSchema as UsdaReleaseUpdateManyMutationInputObjectSchema } from './objects/UsdaReleaseUpdateManyMutationInput.schema';
import { UsdaReleaseWhereInputObjectSchema as UsdaReleaseWhereInputObjectSchema } from './objects/UsdaReleaseWhereInput.schema';

export const UsdaReleaseUpdateManyAndReturnSchema: z.ZodType<Prisma.UsdaReleaseUpdateManyAndReturnArgs> = z.object({ select: UsdaReleaseSelectObjectSchema.optional(), data: UsdaReleaseUpdateManyMutationInputObjectSchema, where: UsdaReleaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseUpdateManyAndReturnArgs>;

export const UsdaReleaseUpdateManyAndReturnZodSchema = z.object({ select: UsdaReleaseSelectObjectSchema.optional(), data: UsdaReleaseUpdateManyMutationInputObjectSchema, where: UsdaReleaseWhereInputObjectSchema.optional() }).strict();