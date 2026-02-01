import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorSelectObjectSchema as ActorSelectObjectSchema } from './objects/ActorSelect.schema';
import { ActorIncludeObjectSchema as ActorIncludeObjectSchema } from './objects/ActorInclude.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './objects/ActorWhereUniqueInput.schema';
import { ActorCreateInputObjectSchema as ActorCreateInputObjectSchema } from './objects/ActorCreateInput.schema';
import { ActorUncheckedCreateInputObjectSchema as ActorUncheckedCreateInputObjectSchema } from './objects/ActorUncheckedCreateInput.schema';
import { ActorUpdateInputObjectSchema as ActorUpdateInputObjectSchema } from './objects/ActorUpdateInput.schema';
import { ActorUncheckedUpdateInputObjectSchema as ActorUncheckedUpdateInputObjectSchema } from './objects/ActorUncheckedUpdateInput.schema';

export const ActorUpsertOneSchema: z.ZodType<Prisma.ActorUpsertArgs> = z.object({ select: ActorSelectObjectSchema.optional(), include: ActorIncludeObjectSchema.optional(), where: ActorWhereUniqueInputObjectSchema, create: z.union([ ActorCreateInputObjectSchema, ActorUncheckedCreateInputObjectSchema ]), update: z.union([ ActorUpdateInputObjectSchema, ActorUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ActorUpsertArgs>;

export const ActorUpsertOneZodSchema = z.object({ select: ActorSelectObjectSchema.optional(), include: ActorIncludeObjectSchema.optional(), where: ActorWhereUniqueInputObjectSchema, create: z.union([ ActorCreateInputObjectSchema, ActorUncheckedCreateInputObjectSchema ]), update: z.union([ ActorUpdateInputObjectSchema, ActorUncheckedUpdateInputObjectSchema ]) }).strict();