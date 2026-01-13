import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCacheEntrySelectObjectSchema as UsdaCacheEntrySelectObjectSchema } from './objects/UsdaCacheEntrySelect.schema';
import { UsdaCacheEntryWhereUniqueInputObjectSchema as UsdaCacheEntryWhereUniqueInputObjectSchema } from './objects/UsdaCacheEntryWhereUniqueInput.schema';
import { UsdaCacheEntryCreateInputObjectSchema as UsdaCacheEntryCreateInputObjectSchema } from './objects/UsdaCacheEntryCreateInput.schema';
import { UsdaCacheEntryUncheckedCreateInputObjectSchema as UsdaCacheEntryUncheckedCreateInputObjectSchema } from './objects/UsdaCacheEntryUncheckedCreateInput.schema';
import { UsdaCacheEntryUpdateInputObjectSchema as UsdaCacheEntryUpdateInputObjectSchema } from './objects/UsdaCacheEntryUpdateInput.schema';
import { UsdaCacheEntryUncheckedUpdateInputObjectSchema as UsdaCacheEntryUncheckedUpdateInputObjectSchema } from './objects/UsdaCacheEntryUncheckedUpdateInput.schema';

export const UsdaCacheEntryUpsertOneSchema: z.ZodType<Prisma.UsdaCacheEntryUpsertArgs> = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(),  where: UsdaCacheEntryWhereUniqueInputObjectSchema, create: z.union([ UsdaCacheEntryCreateInputObjectSchema, UsdaCacheEntryUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaCacheEntryUpdateInputObjectSchema, UsdaCacheEntryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.UsdaCacheEntryUpsertArgs>;

export const UsdaCacheEntryUpsertOneZodSchema = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(),  where: UsdaCacheEntryWhereUniqueInputObjectSchema, create: z.union([ UsdaCacheEntryCreateInputObjectSchema, UsdaCacheEntryUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaCacheEntryUpdateInputObjectSchema, UsdaCacheEntryUncheckedUpdateInputObjectSchema ]) }).strict();