import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeTopUpSelectObjectSchema as ArcadeTopUpSelectObjectSchema } from './objects/ArcadeTopUpSelect.schema';
import { ArcadeTopUpIncludeObjectSchema as ArcadeTopUpIncludeObjectSchema } from './objects/ArcadeTopUpInclude.schema';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './objects/ArcadeTopUpWhereUniqueInput.schema';
import { ArcadeTopUpCreateInputObjectSchema as ArcadeTopUpCreateInputObjectSchema } from './objects/ArcadeTopUpCreateInput.schema';
import { ArcadeTopUpUncheckedCreateInputObjectSchema as ArcadeTopUpUncheckedCreateInputObjectSchema } from './objects/ArcadeTopUpUncheckedCreateInput.schema';
import { ArcadeTopUpUpdateInputObjectSchema as ArcadeTopUpUpdateInputObjectSchema } from './objects/ArcadeTopUpUpdateInput.schema';
import { ArcadeTopUpUncheckedUpdateInputObjectSchema as ArcadeTopUpUncheckedUpdateInputObjectSchema } from './objects/ArcadeTopUpUncheckedUpdateInput.schema';

export const ArcadeTopUpUpsertOneSchema: z.ZodType<Prisma.ArcadeTopUpUpsertArgs> = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), include: ArcadeTopUpIncludeObjectSchema.optional(), where: ArcadeTopUpWhereUniqueInputObjectSchema, create: z.union([ ArcadeTopUpCreateInputObjectSchema, ArcadeTopUpUncheckedCreateInputObjectSchema ]), update: z.union([ ArcadeTopUpUpdateInputObjectSchema, ArcadeTopUpUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ArcadeTopUpUpsertArgs>;

export const ArcadeTopUpUpsertOneZodSchema = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), include: ArcadeTopUpIncludeObjectSchema.optional(), where: ArcadeTopUpWhereUniqueInputObjectSchema, create: z.union([ ArcadeTopUpCreateInputObjectSchema, ArcadeTopUpUncheckedCreateInputObjectSchema ]), update: z.union([ ArcadeTopUpUpdateInputObjectSchema, ArcadeTopUpUncheckedUpdateInputObjectSchema ]) }).strict();