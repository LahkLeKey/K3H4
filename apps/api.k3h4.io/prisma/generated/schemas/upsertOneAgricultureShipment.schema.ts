import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureShipmentSelectObjectSchema as AgricultureShipmentSelectObjectSchema } from './objects/AgricultureShipmentSelect.schema';
import { AgricultureShipmentIncludeObjectSchema as AgricultureShipmentIncludeObjectSchema } from './objects/AgricultureShipmentInclude.schema';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './objects/AgricultureShipmentWhereUniqueInput.schema';
import { AgricultureShipmentCreateInputObjectSchema as AgricultureShipmentCreateInputObjectSchema } from './objects/AgricultureShipmentCreateInput.schema';
import { AgricultureShipmentUncheckedCreateInputObjectSchema as AgricultureShipmentUncheckedCreateInputObjectSchema } from './objects/AgricultureShipmentUncheckedCreateInput.schema';
import { AgricultureShipmentUpdateInputObjectSchema as AgricultureShipmentUpdateInputObjectSchema } from './objects/AgricultureShipmentUpdateInput.schema';
import { AgricultureShipmentUncheckedUpdateInputObjectSchema as AgricultureShipmentUncheckedUpdateInputObjectSchema } from './objects/AgricultureShipmentUncheckedUpdateInput.schema';

export const AgricultureShipmentUpsertOneSchema: z.ZodType<Prisma.AgricultureShipmentUpsertArgs> = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), include: AgricultureShipmentIncludeObjectSchema.optional(), where: AgricultureShipmentWhereUniqueInputObjectSchema, create: z.union([ AgricultureShipmentCreateInputObjectSchema, AgricultureShipmentUncheckedCreateInputObjectSchema ]), update: z.union([ AgricultureShipmentUpdateInputObjectSchema, AgricultureShipmentUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AgricultureShipmentUpsertArgs>;

export const AgricultureShipmentUpsertOneZodSchema = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), include: AgricultureShipmentIncludeObjectSchema.optional(), where: AgricultureShipmentWhereUniqueInputObjectSchema, create: z.union([ AgricultureShipmentCreateInputObjectSchema, AgricultureShipmentUncheckedCreateInputObjectSchema ]), update: z.union([ AgricultureShipmentUpdateInputObjectSchema, AgricultureShipmentUncheckedUpdateInputObjectSchema ]) }).strict();