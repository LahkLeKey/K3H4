import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaReleaseSelectObjectSchema as UsdaReleaseSelectObjectSchema } from './objects/UsdaReleaseSelect.schema';
import { UsdaReleaseWhereUniqueInputObjectSchema as UsdaReleaseWhereUniqueInputObjectSchema } from './objects/UsdaReleaseWhereUniqueInput.schema';

export const UsdaReleaseFindUniqueSchema: z.ZodType<Prisma.UsdaReleaseFindUniqueArgs> = z.object({ select: UsdaReleaseSelectObjectSchema.optional(),  where: UsdaReleaseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseFindUniqueArgs>;

export const UsdaReleaseFindUniqueZodSchema = z.object({ select: UsdaReleaseSelectObjectSchema.optional(),  where: UsdaReleaseWhereUniqueInputObjectSchema }).strict();