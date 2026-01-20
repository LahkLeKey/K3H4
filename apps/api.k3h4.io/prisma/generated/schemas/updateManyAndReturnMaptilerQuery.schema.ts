import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerQuerySelectObjectSchema as MaptilerQuerySelectObjectSchema } from './objects/MaptilerQuerySelect.schema';
import { MaptilerQueryUpdateManyMutationInputObjectSchema as MaptilerQueryUpdateManyMutationInputObjectSchema } from './objects/MaptilerQueryUpdateManyMutationInput.schema';
import { MaptilerQueryWhereInputObjectSchema as MaptilerQueryWhereInputObjectSchema } from './objects/MaptilerQueryWhereInput.schema';

export const MaptilerQueryUpdateManyAndReturnSchema: z.ZodType<Prisma.MaptilerQueryUpdateManyAndReturnArgs> = z.object({ select: MaptilerQuerySelectObjectSchema.optional(), data: MaptilerQueryUpdateManyMutationInputObjectSchema, where: MaptilerQueryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MaptilerQueryUpdateManyAndReturnArgs>;

export const MaptilerQueryUpdateManyAndReturnZodSchema = z.object({ select: MaptilerQuerySelectObjectSchema.optional(), data: MaptilerQueryUpdateManyMutationInputObjectSchema, where: MaptilerQueryWhereInputObjectSchema.optional() }).strict();