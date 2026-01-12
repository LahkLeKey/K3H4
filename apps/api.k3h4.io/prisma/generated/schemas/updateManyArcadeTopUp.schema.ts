import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeTopUpUpdateManyMutationInputObjectSchema as ArcadeTopUpUpdateManyMutationInputObjectSchema } from './objects/ArcadeTopUpUpdateManyMutationInput.schema';
import { ArcadeTopUpWhereInputObjectSchema as ArcadeTopUpWhereInputObjectSchema } from './objects/ArcadeTopUpWhereInput.schema';

export const ArcadeTopUpUpdateManySchema: z.ZodType<Prisma.ArcadeTopUpUpdateManyArgs> = z.object({ data: ArcadeTopUpUpdateManyMutationInputObjectSchema, where: ArcadeTopUpWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeTopUpUpdateManyArgs>;

export const ArcadeTopUpUpdateManyZodSchema = z.object({ data: ArcadeTopUpUpdateManyMutationInputObjectSchema, where: ArcadeTopUpWhereInputObjectSchema.optional() }).strict();