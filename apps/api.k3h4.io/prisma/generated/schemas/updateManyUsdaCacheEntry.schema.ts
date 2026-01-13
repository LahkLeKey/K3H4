import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCacheEntryUpdateManyMutationInputObjectSchema as UsdaCacheEntryUpdateManyMutationInputObjectSchema } from './objects/UsdaCacheEntryUpdateManyMutationInput.schema';
import { UsdaCacheEntryWhereInputObjectSchema as UsdaCacheEntryWhereInputObjectSchema } from './objects/UsdaCacheEntryWhereInput.schema';

export const UsdaCacheEntryUpdateManySchema: z.ZodType<Prisma.UsdaCacheEntryUpdateManyArgs> = z.object({ data: UsdaCacheEntryUpdateManyMutationInputObjectSchema, where: UsdaCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCacheEntryUpdateManyArgs>;

export const UsdaCacheEntryUpdateManyZodSchema = z.object({ data: UsdaCacheEntryUpdateManyMutationInputObjectSchema, where: UsdaCacheEntryWhereInputObjectSchema.optional() }).strict();