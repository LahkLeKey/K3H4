import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosLineItemWhereUniqueInputObjectSchema as PosLineItemWhereUniqueInputObjectSchema } from './PosLineItemWhereUniqueInput.schema';
import { PosLineItemUpdateWithoutTicketInputObjectSchema as PosLineItemUpdateWithoutTicketInputObjectSchema } from './PosLineItemUpdateWithoutTicketInput.schema';
import { PosLineItemUncheckedUpdateWithoutTicketInputObjectSchema as PosLineItemUncheckedUpdateWithoutTicketInputObjectSchema } from './PosLineItemUncheckedUpdateWithoutTicketInput.schema';
import { PosLineItemCreateWithoutTicketInputObjectSchema as PosLineItemCreateWithoutTicketInputObjectSchema } from './PosLineItemCreateWithoutTicketInput.schema';
import { PosLineItemUncheckedCreateWithoutTicketInputObjectSchema as PosLineItemUncheckedCreateWithoutTicketInputObjectSchema } from './PosLineItemUncheckedCreateWithoutTicketInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosLineItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PosLineItemUpdateWithoutTicketInputObjectSchema), z.lazy(() => PosLineItemUncheckedUpdateWithoutTicketInputObjectSchema)]),
  create: z.union([z.lazy(() => PosLineItemCreateWithoutTicketInputObjectSchema), z.lazy(() => PosLineItemUncheckedCreateWithoutTicketInputObjectSchema)])
}).strict();
export const PosLineItemUpsertWithWhereUniqueWithoutTicketInputObjectSchema: z.ZodType<Prisma.PosLineItemUpsertWithWhereUniqueWithoutTicketInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemUpsertWithWhereUniqueWithoutTicketInput>;
export const PosLineItemUpsertWithWhereUniqueWithoutTicketInputObjectZodSchema = makeSchema();
