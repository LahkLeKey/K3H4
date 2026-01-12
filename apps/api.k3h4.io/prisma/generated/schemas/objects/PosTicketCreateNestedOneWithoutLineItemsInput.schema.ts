import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketCreateWithoutLineItemsInputObjectSchema as PosTicketCreateWithoutLineItemsInputObjectSchema } from './PosTicketCreateWithoutLineItemsInput.schema';
import { PosTicketUncheckedCreateWithoutLineItemsInputObjectSchema as PosTicketUncheckedCreateWithoutLineItemsInputObjectSchema } from './PosTicketUncheckedCreateWithoutLineItemsInput.schema';
import { PosTicketCreateOrConnectWithoutLineItemsInputObjectSchema as PosTicketCreateOrConnectWithoutLineItemsInputObjectSchema } from './PosTicketCreateOrConnectWithoutLineItemsInput.schema';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './PosTicketWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PosTicketCreateWithoutLineItemsInputObjectSchema), z.lazy(() => PosTicketUncheckedCreateWithoutLineItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PosTicketCreateOrConnectWithoutLineItemsInputObjectSchema).optional(),
  connect: z.lazy(() => PosTicketWhereUniqueInputObjectSchema).optional()
}).strict();
export const PosTicketCreateNestedOneWithoutLineItemsInputObjectSchema: z.ZodType<Prisma.PosTicketCreateNestedOneWithoutLineItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketCreateNestedOneWithoutLineItemsInput>;
export const PosTicketCreateNestedOneWithoutLineItemsInputObjectZodSchema = makeSchema();
