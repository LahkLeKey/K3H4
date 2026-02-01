import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorSelectObjectSchema as ActorSelectObjectSchema } from './objects/ActorSelect.schema';
import { ActorIncludeObjectSchema as ActorIncludeObjectSchema } from './objects/ActorInclude.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './objects/ActorWhereUniqueInput.schema';

export const ActorFindUniqueOrThrowSchema: z.ZodType<Prisma.ActorFindUniqueOrThrowArgs> = z.object({ select: ActorSelectObjectSchema.optional(), include: ActorIncludeObjectSchema.optional(), where: ActorWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ActorFindUniqueOrThrowArgs>;

export const ActorFindUniqueOrThrowZodSchema = z.object({ select: ActorSelectObjectSchema.optional(), include: ActorIncludeObjectSchema.optional(), where: ActorWhereUniqueInputObjectSchema }).strict();