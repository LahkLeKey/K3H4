import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosLineItemWhereUniqueInputObjectSchema as PosLineItemWhereUniqueInputObjectSchema } from './PosLineItemWhereUniqueInput.schema';
import { PosLineItemCreateWithoutTicketInputObjectSchema as PosLineItemCreateWithoutTicketInputObjectSchema } from './PosLineItemCreateWithoutTicketInput.schema';
import { PosLineItemUncheckedCreateWithoutTicketInputObjectSchema as PosLineItemUncheckedCreateWithoutTicketInputObjectSchema } from './PosLineItemUncheckedCreateWithoutTicketInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosLineItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PosLineItemCreateWithoutTicketInputObjectSchema), z.lazy(() => PosLineItemUncheckedCreateWithoutTicketInputObjectSchema)])
}).strict();
export const PosLineItemCreateOrConnectWithoutTicketInputObjectSchema: z.ZodType<Prisma.PosLineItemCreateOrConnectWithoutTicketInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemCreateOrConnectWithoutTicketInput>;
export const PosLineItemCreateOrConnectWithoutTicketInputObjectZodSchema = makeSchema();
