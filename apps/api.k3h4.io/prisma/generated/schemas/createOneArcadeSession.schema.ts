import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeSessionSelectObjectSchema as ArcadeSessionSelectObjectSchema } from './objects/ArcadeSessionSelect.schema';
import { ArcadeSessionIncludeObjectSchema as ArcadeSessionIncludeObjectSchema } from './objects/ArcadeSessionInclude.schema';
import { ArcadeSessionCreateInputObjectSchema as ArcadeSessionCreateInputObjectSchema } from './objects/ArcadeSessionCreateInput.schema';
import { ArcadeSessionUncheckedCreateInputObjectSchema as ArcadeSessionUncheckedCreateInputObjectSchema } from './objects/ArcadeSessionUncheckedCreateInput.schema';

export const ArcadeSessionCreateOneSchema: z.ZodType<Prisma.ArcadeSessionCreateArgs> = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), include: ArcadeSessionIncludeObjectSchema.optional(), data: z.union([ArcadeSessionCreateInputObjectSchema, ArcadeSessionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionCreateArgs>;

export const ArcadeSessionCreateOneZodSchema = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), include: ArcadeSessionIncludeObjectSchema.optional(), data: z.union([ArcadeSessionCreateInputObjectSchema, ArcadeSessionUncheckedCreateInputObjectSchema]) }).strict();