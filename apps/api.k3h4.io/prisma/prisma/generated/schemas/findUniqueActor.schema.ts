import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorSelectObjectSchema as ActorSelectObjectSchema } from './objects/ActorSelect.schema';
import { ActorIncludeObjectSchema as ActorIncludeObjectSchema } from './objects/ActorInclude.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './objects/ActorWhereUniqueInput.schema';

export const ActorFindUniqueSchema: z.ZodType<Prisma.ActorFindUniqueArgs> = z.object({ select: ActorSelectObjectSchema.optional(), include: ActorIncludeObjectSchema.optional(), where: ActorWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ActorFindUniqueArgs>;

export const ActorFindUniqueZodSchema = z.object({ select: ActorSelectObjectSchema.optional(), include: ActorIncludeObjectSchema.optional(), where: ActorWhereUniqueInputObjectSchema }).strict();