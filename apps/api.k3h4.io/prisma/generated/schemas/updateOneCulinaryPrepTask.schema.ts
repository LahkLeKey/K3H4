import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryPrepTaskSelectObjectSchema as CulinaryPrepTaskSelectObjectSchema } from './objects/CulinaryPrepTaskSelect.schema';
import { CulinaryPrepTaskIncludeObjectSchema as CulinaryPrepTaskIncludeObjectSchema } from './objects/CulinaryPrepTaskInclude.schema';
import { CulinaryPrepTaskUpdateInputObjectSchema as CulinaryPrepTaskUpdateInputObjectSchema } from './objects/CulinaryPrepTaskUpdateInput.schema';
import { CulinaryPrepTaskUncheckedUpdateInputObjectSchema as CulinaryPrepTaskUncheckedUpdateInputObjectSchema } from './objects/CulinaryPrepTaskUncheckedUpdateInput.schema';
import { CulinaryPrepTaskWhereUniqueInputObjectSchema as CulinaryPrepTaskWhereUniqueInputObjectSchema } from './objects/CulinaryPrepTaskWhereUniqueInput.schema';

export const CulinaryPrepTaskUpdateOneSchema: z.ZodType<Prisma.CulinaryPrepTaskUpdateArgs> = z.object({ select: CulinaryPrepTaskSelectObjectSchema.optional(), include: CulinaryPrepTaskIncludeObjectSchema.optional(), data: z.union([CulinaryPrepTaskUpdateInputObjectSchema, CulinaryPrepTaskUncheckedUpdateInputObjectSchema]), where: CulinaryPrepTaskWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CulinaryPrepTaskUpdateArgs>;

export const CulinaryPrepTaskUpdateOneZodSchema = z.object({ select: CulinaryPrepTaskSelectObjectSchema.optional(), include: CulinaryPrepTaskIncludeObjectSchema.optional(), data: z.union([CulinaryPrepTaskUpdateInputObjectSchema, CulinaryPrepTaskUncheckedUpdateInputObjectSchema]), where: CulinaryPrepTaskWhereUniqueInputObjectSchema }).strict();