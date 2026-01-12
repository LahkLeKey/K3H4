import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosLineItemWhereUniqueInputObjectSchema as PosLineItemWhereUniqueInputObjectSchema } from './PosLineItemWhereUniqueInput.schema';
import { PosLineItemUpdateWithoutTicketInputObjectSchema as PosLineItemUpdateWithoutTicketInputObjectSchema } from './PosLineItemUpdateWithoutTicketInput.schema';
import { PosLineItemUncheckedUpdateWithoutTicketInputObjectSchema as PosLineItemUncheckedUpdateWithoutTicketInputObjectSchema } from './PosLineItemUncheckedUpdateWithoutTicketInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosLineItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PosLineItemUpdateWithoutTicketInputObjectSchema), z.lazy(() => PosLineItemUncheckedUpdateWithoutTicketInputObjectSchema)])
}).strict();
export const PosLineItemUpdateWithWhereUniqueWithoutTicketInputObjectSchema: z.ZodType<Prisma.PosLineItemUpdateWithWhereUniqueWithoutTicketInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemUpdateWithWhereUniqueWithoutTicketInput>;
export const PosLineItemUpdateWithWhereUniqueWithoutTicketInputObjectZodSchema = makeSchema();
