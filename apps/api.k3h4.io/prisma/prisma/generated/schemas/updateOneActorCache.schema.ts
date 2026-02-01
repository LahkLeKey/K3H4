import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorCacheSelectObjectSchema as ActorCacheSelectObjectSchema } from './objects/ActorCacheSelect.schema';
import { ActorCacheIncludeObjectSchema as ActorCacheIncludeObjectSchema } from './objects/ActorCacheInclude.schema';
import { ActorCacheUpdateInputObjectSchema as ActorCacheUpdateInputObjectSchema } from './objects/ActorCacheUpdateInput.schema';
import { ActorCacheUncheckedUpdateInputObjectSchema as ActorCacheUncheckedUpdateInputObjectSchema } from './objects/ActorCacheUncheckedUpdateInput.schema';
import { ActorCacheWhereUniqueInputObjectSchema as ActorCacheWhereUniqueInputObjectSchema } from './objects/ActorCacheWhereUniqueInput.schema';

export const ActorCacheUpdateOneSchema: z.ZodType<Prisma.ActorCacheUpdateArgs> = z.object({ select: ActorCacheSelectObjectSchema.optional(), include: ActorCacheIncludeObjectSchema.optional(), data: z.union([ActorCacheUpdateInputObjectSchema, ActorCacheUncheckedUpdateInputObjectSchema]), where: ActorCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ActorCacheUpdateArgs>;

export const ActorCacheUpdateOneZodSchema = z.object({ select: ActorCacheSelectObjectSchema.optional(), include: ActorCacheIncludeObjectSchema.optional(), data: z.union([ActorCacheUpdateInputObjectSchema, ActorCacheUncheckedUpdateInputObjectSchema]), where: ActorCacheWhereUniqueInputObjectSchema }).strict();