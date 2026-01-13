import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeSessionUpdateManyMutationInputObjectSchema as ArcadeSessionUpdateManyMutationInputObjectSchema } from './objects/ArcadeSessionUpdateManyMutationInput.schema';
import { ArcadeSessionWhereInputObjectSchema as ArcadeSessionWhereInputObjectSchema } from './objects/ArcadeSessionWhereInput.schema';

export const ArcadeSessionUpdateManySchema: z.ZodType<Prisma.ArcadeSessionUpdateManyArgs> = z.object({ data: ArcadeSessionUpdateManyMutationInputObjectSchema, where: ArcadeSessionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateManyArgs>;

export const ArcadeSessionUpdateManyZodSchema = z.object({ data: ArcadeSessionUpdateManyMutationInputObjectSchema, where: ArcadeSessionWhereInputObjectSchema.optional() }).strict();