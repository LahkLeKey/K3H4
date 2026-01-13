import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketUpdateWithoutLineItemsInputObjectSchema as PosTicketUpdateWithoutLineItemsInputObjectSchema } from './PosTicketUpdateWithoutLineItemsInput.schema';
import { PosTicketUncheckedUpdateWithoutLineItemsInputObjectSchema as PosTicketUncheckedUpdateWithoutLineItemsInputObjectSchema } from './PosTicketUncheckedUpdateWithoutLineItemsInput.schema';
import { PosTicketCreateWithoutLineItemsInputObjectSchema as PosTicketCreateWithoutLineItemsInputObjectSchema } from './PosTicketCreateWithoutLineItemsInput.schema';
import { PosTicketUncheckedCreateWithoutLineItemsInputObjectSchema as PosTicketUncheckedCreateWithoutLineItemsInputObjectSchema } from './PosTicketUncheckedCreateWithoutLineItemsInput.schema';
import { PosTicketWhereInputObjectSchema as PosTicketWhereInputObjectSchema } from './PosTicketWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PosTicketUpdateWithoutLineItemsInputObjectSchema), z.lazy(() => PosTicketUncheckedUpdateWithoutLineItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => PosTicketCreateWithoutLineItemsInputObjectSchema), z.lazy(() => PosTicketUncheckedCreateWithoutLineItemsInputObjectSchema)]),
  where: z.lazy(() => PosTicketWhereInputObjectSchema).optional()
}).strict();
export const PosTicketUpsertWithoutLineItemsInputObjectSchema: z.ZodType<Prisma.PosTicketUpsertWithoutLineItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUpsertWithoutLineItemsInput>;
export const PosTicketUpsertWithoutLineItemsInputObjectZodSchema = makeSchema();
