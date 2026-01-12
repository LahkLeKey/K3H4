import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketCreateWithoutLineItemsInputObjectSchema as PosTicketCreateWithoutLineItemsInputObjectSchema } from './PosTicketCreateWithoutLineItemsInput.schema';
import { PosTicketUncheckedCreateWithoutLineItemsInputObjectSchema as PosTicketUncheckedCreateWithoutLineItemsInputObjectSchema } from './PosTicketUncheckedCreateWithoutLineItemsInput.schema';
import { PosTicketCreateOrConnectWithoutLineItemsInputObjectSchema as PosTicketCreateOrConnectWithoutLineItemsInputObjectSchema } from './PosTicketCreateOrConnectWithoutLineItemsInput.schema';
import { PosTicketUpsertWithoutLineItemsInputObjectSchema as PosTicketUpsertWithoutLineItemsInputObjectSchema } from './PosTicketUpsertWithoutLineItemsInput.schema';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './PosTicketWhereUniqueInput.schema';
import { PosTicketUpdateToOneWithWhereWithoutLineItemsInputObjectSchema as PosTicketUpdateToOneWithWhereWithoutLineItemsInputObjectSchema } from './PosTicketUpdateToOneWithWhereWithoutLineItemsInput.schema';
import { PosTicketUpdateWithoutLineItemsInputObjectSchema as PosTicketUpdateWithoutLineItemsInputObjectSchema } from './PosTicketUpdateWithoutLineItemsInput.schema';
import { PosTicketUncheckedUpdateWithoutLineItemsInputObjectSchema as PosTicketUncheckedUpdateWithoutLineItemsInputObjectSchema } from './PosTicketUncheckedUpdateWithoutLineItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PosTicketCreateWithoutLineItemsInputObjectSchema), z.lazy(() => PosTicketUncheckedCreateWithoutLineItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PosTicketCreateOrConnectWithoutLineItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => PosTicketUpsertWithoutLineItemsInputObjectSchema).optional(),
  connect: z.lazy(() => PosTicketWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PosTicketUpdateToOneWithWhereWithoutLineItemsInputObjectSchema), z.lazy(() => PosTicketUpdateWithoutLineItemsInputObjectSchema), z.lazy(() => PosTicketUncheckedUpdateWithoutLineItemsInputObjectSchema)]).optional()
}).strict();
export const PosTicketUpdateOneRequiredWithoutLineItemsNestedInputObjectSchema: z.ZodType<Prisma.PosTicketUpdateOneRequiredWithoutLineItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUpdateOneRequiredWithoutLineItemsNestedInput>;
export const PosTicketUpdateOneRequiredWithoutLineItemsNestedInputObjectZodSchema = makeSchema();
