import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorSelectObjectSchema as ActorSelectObjectSchema } from './objects/ActorSelect.schema';
import { ActorIncludeObjectSchema as ActorIncludeObjectSchema } from './objects/ActorInclude.schema';
import { ActorCreateInputObjectSchema as ActorCreateInputObjectSchema } from './objects/ActorCreateInput.schema';
import { ActorUncheckedCreateInputObjectSchema as ActorUncheckedCreateInputObjectSchema } from './objects/ActorUncheckedCreateInput.schema';

export const ActorCreateOneSchema: z.ZodType<Prisma.ActorCreateArgs> = z.object({ select: ActorSelectObjectSchema.optional(), include: ActorIncludeObjectSchema.optional(), data: z.union([ActorCreateInputObjectSchema, ActorUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ActorCreateArgs>;

export const ActorCreateOneZodSchema = z.object({ select: ActorSelectObjectSchema.optional(), include: ActorIncludeObjectSchema.optional(), data: z.union([ActorCreateInputObjectSchema, ActorUncheckedCreateInputObjectSchema]) }).strict();