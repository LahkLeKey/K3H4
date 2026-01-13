import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryPrepTaskSelectObjectSchema as CulinaryPrepTaskSelectObjectSchema } from './objects/CulinaryPrepTaskSelect.schema';
import { CulinaryPrepTaskIncludeObjectSchema as CulinaryPrepTaskIncludeObjectSchema } from './objects/CulinaryPrepTaskInclude.schema';
import { CulinaryPrepTaskWhereUniqueInputObjectSchema as CulinaryPrepTaskWhereUniqueInputObjectSchema } from './objects/CulinaryPrepTaskWhereUniqueInput.schema';
import { CulinaryPrepTaskCreateInputObjectSchema as CulinaryPrepTaskCreateInputObjectSchema } from './objects/CulinaryPrepTaskCreateInput.schema';
import { CulinaryPrepTaskUncheckedCreateInputObjectSchema as CulinaryPrepTaskUncheckedCreateInputObjectSchema } from './objects/CulinaryPrepTaskUncheckedCreateInput.schema';
import { CulinaryPrepTaskUpdateInputObjectSchema as CulinaryPrepTaskUpdateInputObjectSchema } from './objects/CulinaryPrepTaskUpdateInput.schema';
import { CulinaryPrepTaskUncheckedUpdateInputObjectSchema as CulinaryPrepTaskUncheckedUpdateInputObjectSchema } from './objects/CulinaryPrepTaskUncheckedUpdateInput.schema';

export const CulinaryPrepTaskUpsertOneSchema: z.ZodType<Prisma.CulinaryPrepTaskUpsertArgs> = z.object({ select: CulinaryPrepTaskSelectObjectSchema.optional(), include: CulinaryPrepTaskIncludeObjectSchema.optional(), where: CulinaryPrepTaskWhereUniqueInputObjectSchema, create: z.union([ CulinaryPrepTaskCreateInputObjectSchema, CulinaryPrepTaskUncheckedCreateInputObjectSchema ]), update: z.union([ CulinaryPrepTaskUpdateInputObjectSchema, CulinaryPrepTaskUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CulinaryPrepTaskUpsertArgs>;

export const CulinaryPrepTaskUpsertOneZodSchema = z.object({ select: CulinaryPrepTaskSelectObjectSchema.optional(), include: CulinaryPrepTaskIncludeObjectSchema.optional(), where: CulinaryPrepTaskWhereUniqueInputObjectSchema, create: z.union([ CulinaryPrepTaskCreateInputObjectSchema, CulinaryPrepTaskUncheckedCreateInputObjectSchema ]), update: z.union([ CulinaryPrepTaskUpdateInputObjectSchema, CulinaryPrepTaskUncheckedUpdateInputObjectSchema ]) }).strict();