import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeSessionSelectObjectSchema as ArcadeSessionSelectObjectSchema } from './objects/ArcadeSessionSelect.schema';
import { ArcadeSessionIncludeObjectSchema as ArcadeSessionIncludeObjectSchema } from './objects/ArcadeSessionInclude.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './objects/ArcadeSessionWhereUniqueInput.schema';

export const ArcadeSessionDeleteOneSchema: z.ZodType<Prisma.ArcadeSessionDeleteArgs> = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), include: ArcadeSessionIncludeObjectSchema.optional(), where: ArcadeSessionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionDeleteArgs>;

export const ArcadeSessionDeleteOneZodSchema = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), include: ArcadeSessionIncludeObjectSchema.optional(), where: ArcadeSessionWhereUniqueInputObjectSchema }).strict();