import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeRedemptionCreateManyInputObjectSchema as ArcadeRedemptionCreateManyInputObjectSchema } from './objects/ArcadeRedemptionCreateManyInput.schema';

export const ArcadeRedemptionCreateManySchema: z.ZodType<Prisma.ArcadeRedemptionCreateManyArgs> = z.object({ data: z.union([ ArcadeRedemptionCreateManyInputObjectSchema, z.array(ArcadeRedemptionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateManyArgs>;

export const ArcadeRedemptionCreateManyZodSchema = z.object({ data: z.union([ ArcadeRedemptionCreateManyInputObjectSchema, z.array(ArcadeRedemptionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();