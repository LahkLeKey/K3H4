import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeSessionSelectObjectSchema as ArcadeSessionSelectObjectSchema } from './objects/ArcadeSessionSelect.schema';
import { ArcadeSessionIncludeObjectSchema as ArcadeSessionIncludeObjectSchema } from './objects/ArcadeSessionInclude.schema';
import { ArcadeSessionUpdateInputObjectSchema as ArcadeSessionUpdateInputObjectSchema } from './objects/ArcadeSessionUpdateInput.schema';
import { ArcadeSessionUncheckedUpdateInputObjectSchema as ArcadeSessionUncheckedUpdateInputObjectSchema } from './objects/ArcadeSessionUncheckedUpdateInput.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './objects/ArcadeSessionWhereUniqueInput.schema';

export const ArcadeSessionUpdateOneSchema: z.ZodType<Prisma.ArcadeSessionUpdateArgs> = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), include: ArcadeSessionIncludeObjectSchema.optional(), data: z.union([ArcadeSessionUpdateInputObjectSchema, ArcadeSessionUncheckedUpdateInputObjectSchema]), where: ArcadeSessionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateArgs>;

export const ArcadeSessionUpdateOneZodSchema = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), include: ArcadeSessionIncludeObjectSchema.optional(), data: z.union([ArcadeSessionUpdateInputObjectSchema, ArcadeSessionUncheckedUpdateInputObjectSchema]), where: ArcadeSessionWhereUniqueInputObjectSchema }).strict();