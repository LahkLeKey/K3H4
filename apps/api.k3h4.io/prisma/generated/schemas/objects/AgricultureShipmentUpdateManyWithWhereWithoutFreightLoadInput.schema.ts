import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentScalarWhereInputObjectSchema as AgricultureShipmentScalarWhereInputObjectSchema } from './AgricultureShipmentScalarWhereInput.schema';
import { AgricultureShipmentUpdateManyMutationInputObjectSchema as AgricultureShipmentUpdateManyMutationInputObjectSchema } from './AgricultureShipmentUpdateManyMutationInput.schema';
import { AgricultureShipmentUncheckedUpdateManyWithoutFreightLoadInputObjectSchema as AgricultureShipmentUncheckedUpdateManyWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentUncheckedUpdateManyWithoutFreightLoadInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureShipmentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureShipmentUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedUpdateManyWithoutFreightLoadInputObjectSchema)])
}).strict();
export const AgricultureShipmentUpdateManyWithWhereWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUpdateManyWithWhereWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUpdateManyWithWhereWithoutFreightLoadInput>;
export const AgricultureShipmentUpdateManyWithWhereWithoutFreightLoadInputObjectZodSchema = makeSchema();
