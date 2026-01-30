import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorCacheSelectObjectSchema as ActorCacheSelectObjectSchema } from './objects/ActorCacheSelect.schema';
import { ActorCacheIncludeObjectSchema as ActorCacheIncludeObjectSchema } from './objects/ActorCacheInclude.schema';
import { ActorCacheWhereUniqueInputObjectSchema as ActorCacheWhereUniqueInputObjectSchema } from './objects/ActorCacheWhereUniqueInput.schema';

export const ActorCacheFindUniqueOrThrowSchema: z.ZodType<Prisma.ActorCacheFindUniqueOrThrowArgs> = z.object({ select: ActorCacheSelectObjectSchema.optional(), include: ActorCacheIncludeObjectSchema.optional(), where: ActorCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ActorCacheFindUniqueOrThrowArgs>;

export const ActorCacheFindUniqueOrThrowZodSchema = z.object({ select: ActorCacheSelectObjectSchema.optional(), include: ActorCacheIncludeObjectSchema.optional(), where: ActorCacheWhereUniqueInputObjectSchema }).strict();