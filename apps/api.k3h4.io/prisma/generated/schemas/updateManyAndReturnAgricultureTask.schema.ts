import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureTaskSelectObjectSchema as AgricultureTaskSelectObjectSchema } from './objects/AgricultureTaskSelect.schema';
import { AgricultureTaskUpdateManyMutationInputObjectSchema as AgricultureTaskUpdateManyMutationInputObjectSchema } from './objects/AgricultureTaskUpdateManyMutationInput.schema';
import { AgricultureTaskWhereInputObjectSchema as AgricultureTaskWhereInputObjectSchema } from './objects/AgricultureTaskWhereInput.schema';

export const AgricultureTaskUpdateManyAndReturnSchema: z.ZodType<Prisma.AgricultureTaskUpdateManyAndReturnArgs> = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), data: AgricultureTaskUpdateManyMutationInputObjectSchema, where: AgricultureTaskWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskUpdateManyAndReturnArgs>;

export const AgricultureTaskUpdateManyAndReturnZodSchema = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), data: AgricultureTaskUpdateManyMutationInputObjectSchema, where: AgricultureTaskWhereInputObjectSchema.optional() }).strict();