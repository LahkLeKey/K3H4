import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerQueryWhereInputObjectSchema as MaptilerQueryWhereInputObjectSchema } from './objects/MaptilerQueryWhereInput.schema';

export const MaptilerQueryDeleteManySchema: z.ZodType<Prisma.MaptilerQueryDeleteManyArgs> = z.object({ where: MaptilerQueryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MaptilerQueryDeleteManyArgs>;

export const MaptilerQueryDeleteManyZodSchema = z.object({ where: MaptilerQueryWhereInputObjectSchema.optional() }).strict();