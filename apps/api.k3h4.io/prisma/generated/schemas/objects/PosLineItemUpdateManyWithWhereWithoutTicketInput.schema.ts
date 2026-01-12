import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosLineItemScalarWhereInputObjectSchema as PosLineItemScalarWhereInputObjectSchema } from './PosLineItemScalarWhereInput.schema';
import { PosLineItemUpdateManyMutationInputObjectSchema as PosLineItemUpdateManyMutationInputObjectSchema } from './PosLineItemUpdateManyMutationInput.schema';
import { PosLineItemUncheckedUpdateManyWithoutTicketInputObjectSchema as PosLineItemUncheckedUpdateManyWithoutTicketInputObjectSchema } from './PosLineItemUncheckedUpdateManyWithoutTicketInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosLineItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PosLineItemUpdateManyMutationInputObjectSchema), z.lazy(() => PosLineItemUncheckedUpdateManyWithoutTicketInputObjectSchema)])
}).strict();
export const PosLineItemUpdateManyWithWhereWithoutTicketInputObjectSchema: z.ZodType<Prisma.PosLineItemUpdateManyWithWhereWithoutTicketInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemUpdateManyWithWhereWithoutTicketInput>;
export const PosLineItemUpdateManyWithWhereWithoutTicketInputObjectZodSchema = makeSchema();
