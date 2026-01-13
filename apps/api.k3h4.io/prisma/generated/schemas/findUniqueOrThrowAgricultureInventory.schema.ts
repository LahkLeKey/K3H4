import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventorySelectObjectSchema as AgricultureInventorySelectObjectSchema } from './objects/AgricultureInventorySelect.schema';
import { AgricultureInventoryIncludeObjectSchema as AgricultureInventoryIncludeObjectSchema } from './objects/AgricultureInventoryInclude.schema';
import { AgricultureInventoryWhereUniqueInputObjectSchema as AgricultureInventoryWhereUniqueInputObjectSchema } from './objects/AgricultureInventoryWhereUniqueInput.schema';

export const AgricultureInventoryFindUniqueOrThrowSchema: z.ZodType<Prisma.AgricultureInventoryFindUniqueOrThrowArgs> = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), include: AgricultureInventoryIncludeObjectSchema.optional(), where: AgricultureInventoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryFindUniqueOrThrowArgs>;

export const AgricultureInventoryFindUniqueOrThrowZodSchema = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), include: AgricultureInventoryIncludeObjectSchema.optional(), where: AgricultureInventoryWhereUniqueInputObjectSchema }).strict();