import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryPrepTaskSelectObjectSchema as CulinaryPrepTaskSelectObjectSchema } from './objects/CulinaryPrepTaskSelect.schema';
import { CulinaryPrepTaskIncludeObjectSchema as CulinaryPrepTaskIncludeObjectSchema } from './objects/CulinaryPrepTaskInclude.schema';
import { CulinaryPrepTaskCreateInputObjectSchema as CulinaryPrepTaskCreateInputObjectSchema } from './objects/CulinaryPrepTaskCreateInput.schema';
import { CulinaryPrepTaskUncheckedCreateInputObjectSchema as CulinaryPrepTaskUncheckedCreateInputObjectSchema } from './objects/CulinaryPrepTaskUncheckedCreateInput.schema';

export const CulinaryPrepTaskCreateOneSchema: z.ZodType<Prisma.CulinaryPrepTaskCreateArgs> = z.object({ select: CulinaryPrepTaskSelectObjectSchema.optional(), include: CulinaryPrepTaskIncludeObjectSchema.optional(), data: z.union([CulinaryPrepTaskCreateInputObjectSchema, CulinaryPrepTaskUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CulinaryPrepTaskCreateArgs>;

export const CulinaryPrepTaskCreateOneZodSchema = z.object({ select: CulinaryPrepTaskSelectObjectSchema.optional(), include: CulinaryPrepTaskIncludeObjectSchema.optional(), data: z.union([CulinaryPrepTaskCreateInputObjectSchema, CulinaryPrepTaskUncheckedCreateInputObjectSchema]) }).strict();