import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryPrepTaskSelectObjectSchema as CulinaryPrepTaskSelectObjectSchema } from './objects/CulinaryPrepTaskSelect.schema';
import { CulinaryPrepTaskIncludeObjectSchema as CulinaryPrepTaskIncludeObjectSchema } from './objects/CulinaryPrepTaskInclude.schema';
import { CulinaryPrepTaskWhereUniqueInputObjectSchema as CulinaryPrepTaskWhereUniqueInputObjectSchema } from './objects/CulinaryPrepTaskWhereUniqueInput.schema';

export const CulinaryPrepTaskFindUniqueSchema: z.ZodType<Prisma.CulinaryPrepTaskFindUniqueArgs> = z.object({ select: CulinaryPrepTaskSelectObjectSchema.optional(), include: CulinaryPrepTaskIncludeObjectSchema.optional(), where: CulinaryPrepTaskWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CulinaryPrepTaskFindUniqueArgs>;

export const CulinaryPrepTaskFindUniqueZodSchema = z.object({ select: CulinaryPrepTaskSelectObjectSchema.optional(), include: CulinaryPrepTaskIncludeObjectSchema.optional(), where: CulinaryPrepTaskWhereUniqueInputObjectSchema }).strict();