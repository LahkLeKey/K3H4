import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerQuerySelectObjectSchema as MaptilerQuerySelectObjectSchema } from './objects/MaptilerQuerySelect.schema';
import { MaptilerQueryIncludeObjectSchema as MaptilerQueryIncludeObjectSchema } from './objects/MaptilerQueryInclude.schema';
import { MaptilerQueryCreateInputObjectSchema as MaptilerQueryCreateInputObjectSchema } from './objects/MaptilerQueryCreateInput.schema';
import { MaptilerQueryUncheckedCreateInputObjectSchema as MaptilerQueryUncheckedCreateInputObjectSchema } from './objects/MaptilerQueryUncheckedCreateInput.schema';

export const MaptilerQueryCreateOneSchema: z.ZodType<Prisma.MaptilerQueryCreateArgs> = z.object({ select: MaptilerQuerySelectObjectSchema.optional(), include: MaptilerQueryIncludeObjectSchema.optional(), data: z.union([MaptilerQueryCreateInputObjectSchema, MaptilerQueryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.MaptilerQueryCreateArgs>;

export const MaptilerQueryCreateOneZodSchema = z.object({ select: MaptilerQuerySelectObjectSchema.optional(), include: MaptilerQueryIncludeObjectSchema.optional(), data: z.union([MaptilerQueryCreateInputObjectSchema, MaptilerQueryUncheckedCreateInputObjectSchema]) }).strict();