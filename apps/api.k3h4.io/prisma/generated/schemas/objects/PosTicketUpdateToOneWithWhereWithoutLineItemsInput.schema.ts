import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketWhereInputObjectSchema as PosTicketWhereInputObjectSchema } from './PosTicketWhereInput.schema';
import { PosTicketUpdateWithoutLineItemsInputObjectSchema as PosTicketUpdateWithoutLineItemsInputObjectSchema } from './PosTicketUpdateWithoutLineItemsInput.schema';
import { PosTicketUncheckedUpdateWithoutLineItemsInputObjectSchema as PosTicketUncheckedUpdateWithoutLineItemsInputObjectSchema } from './PosTicketUncheckedUpdateWithoutLineItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosTicketWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PosTicketUpdateWithoutLineItemsInputObjectSchema), z.lazy(() => PosTicketUncheckedUpdateWithoutLineItemsInputObjectSchema)])
}).strict();
export const PosTicketUpdateToOneWithWhereWithoutLineItemsInputObjectSchema: z.ZodType<Prisma.PosTicketUpdateToOneWithWhereWithoutLineItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUpdateToOneWithWhereWithoutLineItemsInput>;
export const PosTicketUpdateToOneWithWhereWithoutLineItemsInputObjectZodSchema = makeSchema();
