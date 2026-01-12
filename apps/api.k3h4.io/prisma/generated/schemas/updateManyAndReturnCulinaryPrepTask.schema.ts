import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryPrepTaskSelectObjectSchema as CulinaryPrepTaskSelectObjectSchema } from './objects/CulinaryPrepTaskSelect.schema';
import { CulinaryPrepTaskUpdateManyMutationInputObjectSchema as CulinaryPrepTaskUpdateManyMutationInputObjectSchema } from './objects/CulinaryPrepTaskUpdateManyMutationInput.schema';
import { CulinaryPrepTaskWhereInputObjectSchema as CulinaryPrepTaskWhereInputObjectSchema } from './objects/CulinaryPrepTaskWhereInput.schema';

export const CulinaryPrepTaskUpdateManyAndReturnSchema: z.ZodType<Prisma.CulinaryPrepTaskUpdateManyAndReturnArgs> = z.object({ select: CulinaryPrepTaskSelectObjectSchema.optional(), data: CulinaryPrepTaskUpdateManyMutationInputObjectSchema, where: CulinaryPrepTaskWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CulinaryPrepTaskUpdateManyAndReturnArgs>;

export const CulinaryPrepTaskUpdateManyAndReturnZodSchema = z.object({ select: CulinaryPrepTaskSelectObjectSchema.optional(), data: CulinaryPrepTaskUpdateManyMutationInputObjectSchema, where: CulinaryPrepTaskWhereInputObjectSchema.optional() }).strict();