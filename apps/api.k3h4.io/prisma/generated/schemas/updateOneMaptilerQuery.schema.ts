import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerQuerySelectObjectSchema as MaptilerQuerySelectObjectSchema } from './objects/MaptilerQuerySelect.schema';
import { MaptilerQueryIncludeObjectSchema as MaptilerQueryIncludeObjectSchema } from './objects/MaptilerQueryInclude.schema';
import { MaptilerQueryUpdateInputObjectSchema as MaptilerQueryUpdateInputObjectSchema } from './objects/MaptilerQueryUpdateInput.schema';
import { MaptilerQueryUncheckedUpdateInputObjectSchema as MaptilerQueryUncheckedUpdateInputObjectSchema } from './objects/MaptilerQueryUncheckedUpdateInput.schema';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './objects/MaptilerQueryWhereUniqueInput.schema';

export const MaptilerQueryUpdateOneSchema: z.ZodType<Prisma.MaptilerQueryUpdateArgs> = z.object({ select: MaptilerQuerySelectObjectSchema.optional(), include: MaptilerQueryIncludeObjectSchema.optional(), data: z.union([MaptilerQueryUpdateInputObjectSchema, MaptilerQueryUncheckedUpdateInputObjectSchema]), where: MaptilerQueryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MaptilerQueryUpdateArgs>;

export const MaptilerQueryUpdateOneZodSchema = z.object({ select: MaptilerQuerySelectObjectSchema.optional(), include: MaptilerQueryIncludeObjectSchema.optional(), data: z.union([MaptilerQueryUpdateInputObjectSchema, MaptilerQueryUncheckedUpdateInputObjectSchema]), where: MaptilerQueryWhereUniqueInputObjectSchema }).strict();