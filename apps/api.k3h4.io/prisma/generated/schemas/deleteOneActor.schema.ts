import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorSelectObjectSchema as ActorSelectObjectSchema } from './objects/ActorSelect.schema';
import { ActorIncludeObjectSchema as ActorIncludeObjectSchema } from './objects/ActorInclude.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './objects/ActorWhereUniqueInput.schema';

export const ActorDeleteOneSchema: z.ZodType<Prisma.ActorDeleteArgs> = z.object({ select: ActorSelectObjectSchema.optional(), include: ActorIncludeObjectSchema.optional(), where: ActorWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ActorDeleteArgs>;

export const ActorDeleteOneZodSchema = z.object({ select: ActorSelectObjectSchema.optional(), include: ActorIncludeObjectSchema.optional(), where: ActorWhereUniqueInputObjectSchema }).strict();