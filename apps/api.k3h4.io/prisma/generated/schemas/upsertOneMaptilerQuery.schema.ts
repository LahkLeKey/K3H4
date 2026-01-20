import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerQuerySelectObjectSchema as MaptilerQuerySelectObjectSchema } from './objects/MaptilerQuerySelect.schema';
import { MaptilerQueryIncludeObjectSchema as MaptilerQueryIncludeObjectSchema } from './objects/MaptilerQueryInclude.schema';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './objects/MaptilerQueryWhereUniqueInput.schema';
import { MaptilerQueryCreateInputObjectSchema as MaptilerQueryCreateInputObjectSchema } from './objects/MaptilerQueryCreateInput.schema';
import { MaptilerQueryUncheckedCreateInputObjectSchema as MaptilerQueryUncheckedCreateInputObjectSchema } from './objects/MaptilerQueryUncheckedCreateInput.schema';
import { MaptilerQueryUpdateInputObjectSchema as MaptilerQueryUpdateInputObjectSchema } from './objects/MaptilerQueryUpdateInput.schema';
import { MaptilerQueryUncheckedUpdateInputObjectSchema as MaptilerQueryUncheckedUpdateInputObjectSchema } from './objects/MaptilerQueryUncheckedUpdateInput.schema';

export const MaptilerQueryUpsertOneSchema: z.ZodType<Prisma.MaptilerQueryUpsertArgs> = z.object({ select: MaptilerQuerySelectObjectSchema.optional(), include: MaptilerQueryIncludeObjectSchema.optional(), where: MaptilerQueryWhereUniqueInputObjectSchema, create: z.union([ MaptilerQueryCreateInputObjectSchema, MaptilerQueryUncheckedCreateInputObjectSchema ]), update: z.union([ MaptilerQueryUpdateInputObjectSchema, MaptilerQueryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.MaptilerQueryUpsertArgs>;

export const MaptilerQueryUpsertOneZodSchema = z.object({ select: MaptilerQuerySelectObjectSchema.optional(), include: MaptilerQueryIncludeObjectSchema.optional(), where: MaptilerQueryWhereUniqueInputObjectSchema, create: z.union([ MaptilerQueryCreateInputObjectSchema, MaptilerQueryUncheckedCreateInputObjectSchema ]), update: z.union([ MaptilerQueryUpdateInputObjectSchema, MaptilerQueryUncheckedUpdateInputObjectSchema ]) }).strict();