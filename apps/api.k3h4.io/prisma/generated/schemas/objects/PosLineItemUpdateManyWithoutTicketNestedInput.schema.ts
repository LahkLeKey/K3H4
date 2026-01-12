import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosLineItemCreateWithoutTicketInputObjectSchema as PosLineItemCreateWithoutTicketInputObjectSchema } from './PosLineItemCreateWithoutTicketInput.schema';
import { PosLineItemUncheckedCreateWithoutTicketInputObjectSchema as PosLineItemUncheckedCreateWithoutTicketInputObjectSchema } from './PosLineItemUncheckedCreateWithoutTicketInput.schema';
import { PosLineItemCreateOrConnectWithoutTicketInputObjectSchema as PosLineItemCreateOrConnectWithoutTicketInputObjectSchema } from './PosLineItemCreateOrConnectWithoutTicketInput.schema';
import { PosLineItemUpsertWithWhereUniqueWithoutTicketInputObjectSchema as PosLineItemUpsertWithWhereUniqueWithoutTicketInputObjectSchema } from './PosLineItemUpsertWithWhereUniqueWithoutTicketInput.schema';
import { PosLineItemCreateManyTicketInputEnvelopeObjectSchema as PosLineItemCreateManyTicketInputEnvelopeObjectSchema } from './PosLineItemCreateManyTicketInputEnvelope.schema';
import { PosLineItemWhereUniqueInputObjectSchema as PosLineItemWhereUniqueInputObjectSchema } from './PosLineItemWhereUniqueInput.schema';
import { PosLineItemUpdateWithWhereUniqueWithoutTicketInputObjectSchema as PosLineItemUpdateWithWhereUniqueWithoutTicketInputObjectSchema } from './PosLineItemUpdateWithWhereUniqueWithoutTicketInput.schema';
import { PosLineItemUpdateManyWithWhereWithoutTicketInputObjectSchema as PosLineItemUpdateManyWithWhereWithoutTicketInputObjectSchema } from './PosLineItemUpdateManyWithWhereWithoutTicketInput.schema';
import { PosLineItemScalarWhereInputObjectSchema as PosLineItemScalarWhereInputObjectSchema } from './PosLineItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PosLineItemCreateWithoutTicketInputObjectSchema), z.lazy(() => PosLineItemCreateWithoutTicketInputObjectSchema).array(), z.lazy(() => PosLineItemUncheckedCreateWithoutTicketInputObjectSchema), z.lazy(() => PosLineItemUncheckedCreateWithoutTicketInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PosLineItemCreateOrConnectWithoutTicketInputObjectSchema), z.lazy(() => PosLineItemCreateOrConnectWithoutTicketInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PosLineItemUpsertWithWhereUniqueWithoutTicketInputObjectSchema), z.lazy(() => PosLineItemUpsertWithWhereUniqueWithoutTicketInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PosLineItemCreateManyTicketInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PosLineItemWhereUniqueInputObjectSchema), z.lazy(() => PosLineItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PosLineItemWhereUniqueInputObjectSchema), z.lazy(() => PosLineItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PosLineItemWhereUniqueInputObjectSchema), z.lazy(() => PosLineItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PosLineItemWhereUniqueInputObjectSchema), z.lazy(() => PosLineItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PosLineItemUpdateWithWhereUniqueWithoutTicketInputObjectSchema), z.lazy(() => PosLineItemUpdateWithWhereUniqueWithoutTicketInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PosLineItemUpdateManyWithWhereWithoutTicketInputObjectSchema), z.lazy(() => PosLineItemUpdateManyWithWhereWithoutTicketInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PosLineItemScalarWhereInputObjectSchema), z.lazy(() => PosLineItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PosLineItemUpdateManyWithoutTicketNestedInputObjectSchema: z.ZodType<Prisma.PosLineItemUpdateManyWithoutTicketNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemUpdateManyWithoutTicketNestedInput>;
export const PosLineItemUpdateManyWithoutTicketNestedInputObjectZodSchema = makeSchema();
