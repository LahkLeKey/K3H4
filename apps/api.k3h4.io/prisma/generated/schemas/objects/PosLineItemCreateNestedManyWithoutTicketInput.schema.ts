import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosLineItemCreateWithoutTicketInputObjectSchema as PosLineItemCreateWithoutTicketInputObjectSchema } from './PosLineItemCreateWithoutTicketInput.schema';
import { PosLineItemUncheckedCreateWithoutTicketInputObjectSchema as PosLineItemUncheckedCreateWithoutTicketInputObjectSchema } from './PosLineItemUncheckedCreateWithoutTicketInput.schema';
import { PosLineItemCreateOrConnectWithoutTicketInputObjectSchema as PosLineItemCreateOrConnectWithoutTicketInputObjectSchema } from './PosLineItemCreateOrConnectWithoutTicketInput.schema';
import { PosLineItemCreateManyTicketInputEnvelopeObjectSchema as PosLineItemCreateManyTicketInputEnvelopeObjectSchema } from './PosLineItemCreateManyTicketInputEnvelope.schema';
import { PosLineItemWhereUniqueInputObjectSchema as PosLineItemWhereUniqueInputObjectSchema } from './PosLineItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PosLineItemCreateWithoutTicketInputObjectSchema), z.lazy(() => PosLineItemCreateWithoutTicketInputObjectSchema).array(), z.lazy(() => PosLineItemUncheckedCreateWithoutTicketInputObjectSchema), z.lazy(() => PosLineItemUncheckedCreateWithoutTicketInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PosLineItemCreateOrConnectWithoutTicketInputObjectSchema), z.lazy(() => PosLineItemCreateOrConnectWithoutTicketInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PosLineItemCreateManyTicketInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PosLineItemWhereUniqueInputObjectSchema), z.lazy(() => PosLineItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PosLineItemCreateNestedManyWithoutTicketInputObjectSchema: z.ZodType<Prisma.PosLineItemCreateNestedManyWithoutTicketInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemCreateNestedManyWithoutTicketInput>;
export const PosLineItemCreateNestedManyWithoutTicketInputObjectZodSchema = makeSchema();
