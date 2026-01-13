import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaReleaseSelectObjectSchema as UsdaReleaseSelectObjectSchema } from './objects/UsdaReleaseSelect.schema';
import { UsdaReleaseWhereUniqueInputObjectSchema as UsdaReleaseWhereUniqueInputObjectSchema } from './objects/UsdaReleaseWhereUniqueInput.schema';

export const UsdaReleaseFindUniqueOrThrowSchema: z.ZodType<Prisma.UsdaReleaseFindUniqueOrThrowArgs> = z.object({ select: UsdaReleaseSelectObjectSchema.optional(),  where: UsdaReleaseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseFindUniqueOrThrowArgs>;

export const UsdaReleaseFindUniqueOrThrowZodSchema = z.object({ select: UsdaReleaseSelectObjectSchema.optional(),  where: UsdaReleaseWhereUniqueInputObjectSchema }).strict();