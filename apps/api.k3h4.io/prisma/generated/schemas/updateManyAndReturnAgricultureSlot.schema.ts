import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureSlotSelectObjectSchema as AgricultureSlotSelectObjectSchema } from './objects/AgricultureSlotSelect.schema';
import { AgricultureSlotUpdateManyMutationInputObjectSchema as AgricultureSlotUpdateManyMutationInputObjectSchema } from './objects/AgricultureSlotUpdateManyMutationInput.schema';
import { AgricultureSlotWhereInputObjectSchema as AgricultureSlotWhereInputObjectSchema } from './objects/AgricultureSlotWhereInput.schema';

export const AgricultureSlotUpdateManyAndReturnSchema: z.ZodType<Prisma.AgricultureSlotUpdateManyAndReturnArgs> = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), data: AgricultureSlotUpdateManyMutationInputObjectSchema, where: AgricultureSlotWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureSlotUpdateManyAndReturnArgs>;

export const AgricultureSlotUpdateManyAndReturnZodSchema = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), data: AgricultureSlotUpdateManyMutationInputObjectSchema, where: AgricultureSlotWhereInputObjectSchema.optional() }).strict();