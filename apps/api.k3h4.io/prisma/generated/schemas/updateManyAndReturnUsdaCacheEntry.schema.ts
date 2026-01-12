import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCacheEntrySelectObjectSchema as UsdaCacheEntrySelectObjectSchema } from './objects/UsdaCacheEntrySelect.schema';
import { UsdaCacheEntryUpdateManyMutationInputObjectSchema as UsdaCacheEntryUpdateManyMutationInputObjectSchema } from './objects/UsdaCacheEntryUpdateManyMutationInput.schema';
import { UsdaCacheEntryWhereInputObjectSchema as UsdaCacheEntryWhereInputObjectSchema } from './objects/UsdaCacheEntryWhereInput.schema';

export const UsdaCacheEntryUpdateManyAndReturnSchema: z.ZodType<Prisma.UsdaCacheEntryUpdateManyAndReturnArgs> = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(), data: UsdaCacheEntryUpdateManyMutationInputObjectSchema, where: UsdaCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCacheEntryUpdateManyAndReturnArgs>;

export const UsdaCacheEntryUpdateManyAndReturnZodSchema = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(), data: UsdaCacheEntryUpdateManyMutationInputObjectSchema, where: UsdaCacheEntryWhereInputObjectSchema.optional() }).strict();