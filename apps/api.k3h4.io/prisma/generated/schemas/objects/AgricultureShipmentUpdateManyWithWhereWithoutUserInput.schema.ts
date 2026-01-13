import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentScalarWhereInputObjectSchema as AgricultureShipmentScalarWhereInputObjectSchema } from './AgricultureShipmentScalarWhereInput.schema';
import { AgricultureShipmentUpdateManyMutationInputObjectSchema as AgricultureShipmentUpdateManyMutationInputObjectSchema } from './AgricultureShipmentUpdateManyMutationInput.schema';
import { AgricultureShipmentUncheckedUpdateManyWithoutUserInputObjectSchema as AgricultureShipmentUncheckedUpdateManyWithoutUserInputObjectSchema } from './AgricultureShipmentUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureShipmentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureShipmentUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureShipmentUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUpdateManyWithWhereWithoutUserInput>;
export const AgricultureShipmentUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
