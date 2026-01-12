import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeSessionSelectObjectSchema as ArcadeSessionSelectObjectSchema } from './objects/ArcadeSessionSelect.schema';
import { ArcadeSessionIncludeObjectSchema as ArcadeSessionIncludeObjectSchema } from './objects/ArcadeSessionInclude.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './objects/ArcadeSessionWhereUniqueInput.schema';

export const ArcadeSessionFindUniqueSchema: z.ZodType<Prisma.ArcadeSessionFindUniqueArgs> = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), include: ArcadeSessionIncludeObjectSchema.optional(), where: ArcadeSessionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionFindUniqueArgs>;

export const ArcadeSessionFindUniqueZodSchema = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), include: ArcadeSessionIncludeObjectSchema.optional(), where: ArcadeSessionWhereUniqueInputObjectSchema }).strict();