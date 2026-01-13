import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './PosTicketWhereUniqueInput.schema';
import { PosTicketCreateWithoutLineItemsInputObjectSchema as PosTicketCreateWithoutLineItemsInputObjectSchema } from './PosTicketCreateWithoutLineItemsInput.schema';
import { PosTicketUncheckedCreateWithoutLineItemsInputObjectSchema as PosTicketUncheckedCreateWithoutLineItemsInputObjectSchema } from './PosTicketUncheckedCreateWithoutLineItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosTicketWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PosTicketCreateWithoutLineItemsInputObjectSchema), z.lazy(() => PosTicketUncheckedCreateWithoutLineItemsInputObjectSchema)])
}).strict();
export const PosTicketCreateOrConnectWithoutLineItemsInputObjectSchema: z.ZodType<Prisma.PosTicketCreateOrConnectWithoutLineItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketCreateOrConnectWithoutLineItemsInput>;
export const PosTicketCreateOrConnectWithoutLineItemsInputObjectZodSchema = makeSchema();
