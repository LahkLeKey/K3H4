import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeTopUpSelectObjectSchema as ArcadeTopUpSelectObjectSchema } from './objects/ArcadeTopUpSelect.schema';
import { ArcadeTopUpIncludeObjectSchema as ArcadeTopUpIncludeObjectSchema } from './objects/ArcadeTopUpInclude.schema';
import { ArcadeTopUpUpdateInputObjectSchema as ArcadeTopUpUpdateInputObjectSchema } from './objects/ArcadeTopUpUpdateInput.schema';
import { ArcadeTopUpUncheckedUpdateInputObjectSchema as ArcadeTopUpUncheckedUpdateInputObjectSchema } from './objects/ArcadeTopUpUncheckedUpdateInput.schema';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './objects/ArcadeTopUpWhereUniqueInput.schema';

export const ArcadeTopUpUpdateOneSchema: z.ZodType<Prisma.ArcadeTopUpUpdateArgs> = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), include: ArcadeTopUpIncludeObjectSchema.optional(), data: z.union([ArcadeTopUpUpdateInputObjectSchema, ArcadeTopUpUncheckedUpdateInputObjectSchema]), where: ArcadeTopUpWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ArcadeTopUpUpdateArgs>;

export const ArcadeTopUpUpdateOneZodSchema = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), include: ArcadeTopUpIncludeObjectSchema.optional(), data: z.union([ArcadeTopUpUpdateInputObjectSchema, ArcadeTopUpUncheckedUpdateInputObjectSchema]), where: ArcadeTopUpWhereUniqueInputObjectSchema }).strict();