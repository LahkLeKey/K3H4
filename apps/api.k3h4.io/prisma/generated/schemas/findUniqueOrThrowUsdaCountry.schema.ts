import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCountrySelectObjectSchema as UsdaCountrySelectObjectSchema } from './objects/UsdaCountrySelect.schema';
import { UsdaCountryWhereUniqueInputObjectSchema as UsdaCountryWhereUniqueInputObjectSchema } from './objects/UsdaCountryWhereUniqueInput.schema';

export const UsdaCountryFindUniqueOrThrowSchema: z.ZodType<Prisma.UsdaCountryFindUniqueOrThrowArgs> = z.object({ select: UsdaCountrySelectObjectSchema.optional(),  where: UsdaCountryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaCountryFindUniqueOrThrowArgs>;

export const UsdaCountryFindUniqueOrThrowZodSchema = z.object({ select: UsdaCountrySelectObjectSchema.optional(),  where: UsdaCountryWhereUniqueInputObjectSchema }).strict();