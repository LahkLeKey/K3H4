import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeSessionSelectObjectSchema as ArcadeSessionSelectObjectSchema } from './objects/ArcadeSessionSelect.schema';
import { ArcadeSessionIncludeObjectSchema as ArcadeSessionIncludeObjectSchema } from './objects/ArcadeSessionInclude.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './objects/ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionCreateInputObjectSchema as ArcadeSessionCreateInputObjectSchema } from './objects/ArcadeSessionCreateInput.schema';
import { ArcadeSessionUncheckedCreateInputObjectSchema as ArcadeSessionUncheckedCreateInputObjectSchema } from './objects/ArcadeSessionUncheckedCreateInput.schema';
import { ArcadeSessionUpdateInputObjectSchema as ArcadeSessionUpdateInputObjectSchema } from './objects/ArcadeSessionUpdateInput.schema';
import { ArcadeSessionUncheckedUpdateInputObjectSchema as ArcadeSessionUncheckedUpdateInputObjectSchema } from './objects/ArcadeSessionUncheckedUpdateInput.schema';

export const ArcadeSessionUpsertOneSchema: z.ZodType<Prisma.ArcadeSessionUpsertArgs> = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), include: ArcadeSessionIncludeObjectSchema.optional(), where: ArcadeSessionWhereUniqueInputObjectSchema, create: z.union([ ArcadeSessionCreateInputObjectSchema, ArcadeSessionUncheckedCreateInputObjectSchema ]), update: z.union([ ArcadeSessionUpdateInputObjectSchema, ArcadeSessionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionUpsertArgs>;

export const ArcadeSessionUpsertOneZodSchema = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), include: ArcadeSessionIncludeObjectSchema.optional(), where: ArcadeSessionWhereUniqueInputObjectSchema, create: z.union([ ArcadeSessionCreateInputObjectSchema, ArcadeSessionUncheckedCreateInputObjectSchema ]), update: z.union([ ArcadeSessionUpdateInputObjectSchema, ArcadeSessionUncheckedUpdateInputObjectSchema ]) }).strict();