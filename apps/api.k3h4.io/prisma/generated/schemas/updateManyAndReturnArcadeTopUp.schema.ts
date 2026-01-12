import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeTopUpSelectObjectSchema as ArcadeTopUpSelectObjectSchema } from './objects/ArcadeTopUpSelect.schema';
import { ArcadeTopUpUpdateManyMutationInputObjectSchema as ArcadeTopUpUpdateManyMutationInputObjectSchema } from './objects/ArcadeTopUpUpdateManyMutationInput.schema';
import { ArcadeTopUpWhereInputObjectSchema as ArcadeTopUpWhereInputObjectSchema } from './objects/ArcadeTopUpWhereInput.schema';

export const ArcadeTopUpUpdateManyAndReturnSchema: z.ZodType<Prisma.ArcadeTopUpUpdateManyAndReturnArgs> = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), data: ArcadeTopUpUpdateManyMutationInputObjectSchema, where: ArcadeTopUpWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeTopUpUpdateManyAndReturnArgs>;

export const ArcadeTopUpUpdateManyAndReturnZodSchema = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), data: ArcadeTopUpUpdateManyMutationInputObjectSchema, where: ArcadeTopUpWhereInputObjectSchema.optional() }).strict();