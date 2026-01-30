import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './objects/ActorWhereInput.schema';

export const ActorDeleteManySchema: z.ZodType<Prisma.ActorDeleteManyArgs> = z.object({ where: ActorWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ActorDeleteManyArgs>;

export const ActorDeleteManyZodSchema = z.object({ where: ActorWhereInputObjectSchema.optional() }).strict();