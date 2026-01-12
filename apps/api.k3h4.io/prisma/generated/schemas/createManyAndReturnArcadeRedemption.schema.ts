import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeRedemptionSelectObjectSchema as ArcadeRedemptionSelectObjectSchema } from './objects/ArcadeRedemptionSelect.schema';
import { ArcadeRedemptionCreateManyInputObjectSchema as ArcadeRedemptionCreateManyInputObjectSchema } from './objects/ArcadeRedemptionCreateManyInput.schema';

export const ArcadeRedemptionCreateManyAndReturnSchema: z.ZodType<Prisma.ArcadeRedemptionCreateManyAndReturnArgs> = z.object({ select: ArcadeRedemptionSelectObjectSchema.optional(), data: z.union([ ArcadeRedemptionCreateManyInputObjectSchema, z.array(ArcadeRedemptionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateManyAndReturnArgs>;

export const ArcadeRedemptionCreateManyAndReturnZodSchema = z.object({ select: ArcadeRedemptionSelectObjectSchema.optional(), data: z.union([ ArcadeRedemptionCreateManyInputObjectSchema, z.array(ArcadeRedemptionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();