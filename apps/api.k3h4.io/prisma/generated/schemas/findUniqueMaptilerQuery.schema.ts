import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerQuerySelectObjectSchema as MaptilerQuerySelectObjectSchema } from './objects/MaptilerQuerySelect.schema';
import { MaptilerQueryIncludeObjectSchema as MaptilerQueryIncludeObjectSchema } from './objects/MaptilerQueryInclude.schema';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './objects/MaptilerQueryWhereUniqueInput.schema';

export const MaptilerQueryFindUniqueSchema: z.ZodType<Prisma.MaptilerQueryFindUniqueArgs> = z.object({ select: MaptilerQuerySelectObjectSchema.optional(), include: MaptilerQueryIncludeObjectSchema.optional(), where: MaptilerQueryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MaptilerQueryFindUniqueArgs>;

export const MaptilerQueryFindUniqueZodSchema = z.object({ select: MaptilerQuerySelectObjectSchema.optional(), include: MaptilerQueryIncludeObjectSchema.optional(), where: MaptilerQueryWhereUniqueInputObjectSchema }).strict();