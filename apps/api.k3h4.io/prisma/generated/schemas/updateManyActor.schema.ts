import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorUpdateManyMutationInputObjectSchema as ActorUpdateManyMutationInputObjectSchema } from './objects/ActorUpdateManyMutationInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './objects/ActorWhereInput.schema';

export const ActorUpdateManySchema: z.ZodType<Prisma.ActorUpdateManyArgs> = z.object({ data: ActorUpdateManyMutationInputObjectSchema, where: ActorWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ActorUpdateManyArgs>;

export const ActorUpdateManyZodSchema = z.object({ data: ActorUpdateManyMutationInputObjectSchema, where: ActorWhereInputObjectSchema.optional() }).strict();