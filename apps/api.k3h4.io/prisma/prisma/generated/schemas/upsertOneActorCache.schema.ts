import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorCacheSelectObjectSchema as ActorCacheSelectObjectSchema } from './objects/ActorCacheSelect.schema';
import { ActorCacheIncludeObjectSchema as ActorCacheIncludeObjectSchema } from './objects/ActorCacheInclude.schema';
import { ActorCacheWhereUniqueInputObjectSchema as ActorCacheWhereUniqueInputObjectSchema } from './objects/ActorCacheWhereUniqueInput.schema';
import { ActorCacheCreateInputObjectSchema as ActorCacheCreateInputObjectSchema } from './objects/ActorCacheCreateInput.schema';
import { ActorCacheUncheckedCreateInputObjectSchema as ActorCacheUncheckedCreateInputObjectSchema } from './objects/ActorCacheUncheckedCreateInput.schema';
import { ActorCacheUpdateInputObjectSchema as ActorCacheUpdateInputObjectSchema } from './objects/ActorCacheUpdateInput.schema';
import { ActorCacheUncheckedUpdateInputObjectSchema as ActorCacheUncheckedUpdateInputObjectSchema } from './objects/ActorCacheUncheckedUpdateInput.schema';

export const ActorCacheUpsertOneSchema: z.ZodType<Prisma.ActorCacheUpsertArgs> = z.object({ select: ActorCacheSelectObjectSchema.optional(), include: ActorCacheIncludeObjectSchema.optional(), where: ActorCacheWhereUniqueInputObjectSchema, create: z.union([ ActorCacheCreateInputObjectSchema, ActorCacheUncheckedCreateInputObjectSchema ]), update: z.union([ ActorCacheUpdateInputObjectSchema, ActorCacheUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ActorCacheUpsertArgs>;

export const ActorCacheUpsertOneZodSchema = z.object({ select: ActorCacheSelectObjectSchema.optional(), include: ActorCacheIncludeObjectSchema.optional(), where: ActorCacheWhereUniqueInputObjectSchema, create: z.union([ ActorCacheCreateInputObjectSchema, ActorCacheUncheckedCreateInputObjectSchema ]), update: z.union([ ActorCacheUpdateInputObjectSchema, ActorCacheUncheckedUpdateInputObjectSchema ]) }).strict();