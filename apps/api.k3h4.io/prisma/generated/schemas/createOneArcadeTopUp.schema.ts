import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeTopUpSelectObjectSchema as ArcadeTopUpSelectObjectSchema } from './objects/ArcadeTopUpSelect.schema';
import { ArcadeTopUpIncludeObjectSchema as ArcadeTopUpIncludeObjectSchema } from './objects/ArcadeTopUpInclude.schema';
import { ArcadeTopUpCreateInputObjectSchema as ArcadeTopUpCreateInputObjectSchema } from './objects/ArcadeTopUpCreateInput.schema';
import { ArcadeTopUpUncheckedCreateInputObjectSchema as ArcadeTopUpUncheckedCreateInputObjectSchema } from './objects/ArcadeTopUpUncheckedCreateInput.schema';

export const ArcadeTopUpCreateOneSchema: z.ZodType<Prisma.ArcadeTopUpCreateArgs> = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), include: ArcadeTopUpIncludeObjectSchema.optional(), data: z.union([ArcadeTopUpCreateInputObjectSchema, ArcadeTopUpUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ArcadeTopUpCreateArgs>;

export const ArcadeTopUpCreateOneZodSchema = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), include: ArcadeTopUpIncludeObjectSchema.optional(), data: z.union([ArcadeTopUpCreateInputObjectSchema, ArcadeTopUpUncheckedCreateInputObjectSchema]) }).strict();