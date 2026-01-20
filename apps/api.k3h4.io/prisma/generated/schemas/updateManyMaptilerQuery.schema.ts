import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerQueryUpdateManyMutationInputObjectSchema as MaptilerQueryUpdateManyMutationInputObjectSchema } from './objects/MaptilerQueryUpdateManyMutationInput.schema';
import { MaptilerQueryWhereInputObjectSchema as MaptilerQueryWhereInputObjectSchema } from './objects/MaptilerQueryWhereInput.schema';

export const MaptilerQueryUpdateManySchema: z.ZodType<Prisma.MaptilerQueryUpdateManyArgs> = z.object({ data: MaptilerQueryUpdateManyMutationInputObjectSchema, where: MaptilerQueryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MaptilerQueryUpdateManyArgs>;

export const MaptilerQueryUpdateManyZodSchema = z.object({ data: MaptilerQueryUpdateManyMutationInputObjectSchema, where: MaptilerQueryWhereInputObjectSchema.optional() }).strict();