import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeTopUpSelectObjectSchema as ArcadeTopUpSelectObjectSchema } from './objects/ArcadeTopUpSelect.schema';
import { ArcadeTopUpIncludeObjectSchema as ArcadeTopUpIncludeObjectSchema } from './objects/ArcadeTopUpInclude.schema';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './objects/ArcadeTopUpWhereUniqueInput.schema';

export const ArcadeTopUpDeleteOneSchema: z.ZodType<Prisma.ArcadeTopUpDeleteArgs> = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), include: ArcadeTopUpIncludeObjectSchema.optional(), where: ArcadeTopUpWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeTopUpDeleteArgs>;

export const ArcadeTopUpDeleteOneZodSchema = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), include: ArcadeTopUpIncludeObjectSchema.optional(), where: ArcadeTopUpWhereUniqueInputObjectSchema }).strict();