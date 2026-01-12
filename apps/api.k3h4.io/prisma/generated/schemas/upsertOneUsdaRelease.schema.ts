import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaReleaseSelectObjectSchema as UsdaReleaseSelectObjectSchema } from './objects/UsdaReleaseSelect.schema';
import { UsdaReleaseWhereUniqueInputObjectSchema as UsdaReleaseWhereUniqueInputObjectSchema } from './objects/UsdaReleaseWhereUniqueInput.schema';
import { UsdaReleaseCreateInputObjectSchema as UsdaReleaseCreateInputObjectSchema } from './objects/UsdaReleaseCreateInput.schema';
import { UsdaReleaseUncheckedCreateInputObjectSchema as UsdaReleaseUncheckedCreateInputObjectSchema } from './objects/UsdaReleaseUncheckedCreateInput.schema';
import { UsdaReleaseUpdateInputObjectSchema as UsdaReleaseUpdateInputObjectSchema } from './objects/UsdaReleaseUpdateInput.schema';
import { UsdaReleaseUncheckedUpdateInputObjectSchema as UsdaReleaseUncheckedUpdateInputObjectSchema } from './objects/UsdaReleaseUncheckedUpdateInput.schema';

export const UsdaReleaseUpsertOneSchema: z.ZodType<Prisma.UsdaReleaseUpsertArgs> = z.object({ select: UsdaReleaseSelectObjectSchema.optional(),  where: UsdaReleaseWhereUniqueInputObjectSchema, create: z.union([ UsdaReleaseCreateInputObjectSchema, UsdaReleaseUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaReleaseUpdateInputObjectSchema, UsdaReleaseUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseUpsertArgs>;

export const UsdaReleaseUpsertOneZodSchema = z.object({ select: UsdaReleaseSelectObjectSchema.optional(),  where: UsdaReleaseWhereUniqueInputObjectSchema, create: z.union([ UsdaReleaseCreateInputObjectSchema, UsdaReleaseUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaReleaseUpdateInputObjectSchema, UsdaReleaseUncheckedUpdateInputObjectSchema ]) }).strict();