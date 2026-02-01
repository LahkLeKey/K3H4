import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorCacheSelectObjectSchema as ActorCacheSelectObjectSchema } from './objects/ActorCacheSelect.schema';
import { ActorCacheIncludeObjectSchema as ActorCacheIncludeObjectSchema } from './objects/ActorCacheInclude.schema';
import { ActorCacheCreateInputObjectSchema as ActorCacheCreateInputObjectSchema } from './objects/ActorCacheCreateInput.schema';
import { ActorCacheUncheckedCreateInputObjectSchema as ActorCacheUncheckedCreateInputObjectSchema } from './objects/ActorCacheUncheckedCreateInput.schema';

export const ActorCacheCreateOneSchema: z.ZodType<Prisma.ActorCacheCreateArgs> = z.object({ select: ActorCacheSelectObjectSchema.optional(), include: ActorCacheIncludeObjectSchema.optional(), data: z.union([ActorCacheCreateInputObjectSchema, ActorCacheUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ActorCacheCreateArgs>;

export const ActorCacheCreateOneZodSchema = z.object({ select: ActorCacheSelectObjectSchema.optional(), include: ActorCacheIncludeObjectSchema.optional(), data: z.union([ActorCacheCreateInputObjectSchema, ActorCacheUncheckedCreateInputObjectSchema]) }).strict();