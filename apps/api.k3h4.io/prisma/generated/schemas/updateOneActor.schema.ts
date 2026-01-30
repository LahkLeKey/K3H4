import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorSelectObjectSchema as ActorSelectObjectSchema } from './objects/ActorSelect.schema';
import { ActorIncludeObjectSchema as ActorIncludeObjectSchema } from './objects/ActorInclude.schema';
import { ActorUpdateInputObjectSchema as ActorUpdateInputObjectSchema } from './objects/ActorUpdateInput.schema';
import { ActorUncheckedUpdateInputObjectSchema as ActorUncheckedUpdateInputObjectSchema } from './objects/ActorUncheckedUpdateInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './objects/ActorWhereUniqueInput.schema';

export const ActorUpdateOneSchema: z.ZodType<Prisma.ActorUpdateArgs> = z.object({ select: ActorSelectObjectSchema.optional(), include: ActorIncludeObjectSchema.optional(), data: z.union([ActorUpdateInputObjectSchema, ActorUncheckedUpdateInputObjectSchema]), where: ActorWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ActorUpdateArgs>;

export const ActorUpdateOneZodSchema = z.object({ select: ActorSelectObjectSchema.optional(), include: ActorIncludeObjectSchema.optional(), data: z.union([ActorUpdateInputObjectSchema, ActorUncheckedUpdateInputObjectSchema]), where: ActorWhereUniqueInputObjectSchema }).strict();