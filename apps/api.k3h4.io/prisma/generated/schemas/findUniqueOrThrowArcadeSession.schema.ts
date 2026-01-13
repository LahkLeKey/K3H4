import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeSessionSelectObjectSchema as ArcadeSessionSelectObjectSchema } from './objects/ArcadeSessionSelect.schema';
import { ArcadeSessionIncludeObjectSchema as ArcadeSessionIncludeObjectSchema } from './objects/ArcadeSessionInclude.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './objects/ArcadeSessionWhereUniqueInput.schema';

export const ArcadeSessionFindUniqueOrThrowSchema: z.ZodType<Prisma.ArcadeSessionFindUniqueOrThrowArgs> = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), include: ArcadeSessionIncludeObjectSchema.optional(), where: ArcadeSessionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionFindUniqueOrThrowArgs>;

export const ArcadeSessionFindUniqueOrThrowZodSchema = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), include: ArcadeSessionIncludeObjectSchema.optional(), where: ArcadeSessionWhereUniqueInputObjectSchema }).strict();