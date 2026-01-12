import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeTopUpSelectObjectSchema as ArcadeTopUpSelectObjectSchema } from './objects/ArcadeTopUpSelect.schema';
import { ArcadeTopUpIncludeObjectSchema as ArcadeTopUpIncludeObjectSchema } from './objects/ArcadeTopUpInclude.schema';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './objects/ArcadeTopUpWhereUniqueInput.schema';

export const ArcadeTopUpFindUniqueOrThrowSchema: z.ZodType<Prisma.ArcadeTopUpFindUniqueOrThrowArgs> = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), include: ArcadeTopUpIncludeObjectSchema.optional(), where: ArcadeTopUpWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeTopUpFindUniqueOrThrowArgs>;

export const ArcadeTopUpFindUniqueOrThrowZodSchema = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), include: ArcadeTopUpIncludeObjectSchema.optional(), where: ArcadeTopUpWhereUniqueInputObjectSchema }).strict();