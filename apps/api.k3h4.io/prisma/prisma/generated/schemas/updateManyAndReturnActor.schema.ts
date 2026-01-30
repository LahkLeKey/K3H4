import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorSelectObjectSchema as ActorSelectObjectSchema } from './objects/ActorSelect.schema';
import { ActorUpdateManyMutationInputObjectSchema as ActorUpdateManyMutationInputObjectSchema } from './objects/ActorUpdateManyMutationInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './objects/ActorWhereInput.schema';

export const ActorUpdateManyAndReturnSchema: z.ZodType<Prisma.ActorUpdateManyAndReturnArgs> = z.object({ select: ActorSelectObjectSchema.optional(), data: ActorUpdateManyMutationInputObjectSchema, where: ActorWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ActorUpdateManyAndReturnArgs>;

export const ActorUpdateManyAndReturnZodSchema = z.object({ select: ActorSelectObjectSchema.optional(), data: ActorUpdateManyMutationInputObjectSchema, where: ActorWhereInputObjectSchema.optional() }).strict();