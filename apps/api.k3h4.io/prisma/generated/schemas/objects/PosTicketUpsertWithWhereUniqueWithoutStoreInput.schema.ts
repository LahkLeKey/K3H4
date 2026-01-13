import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './PosTicketWhereUniqueInput.schema';
import { PosTicketUpdateWithoutStoreInputObjectSchema as PosTicketUpdateWithoutStoreInputObjectSchema } from './PosTicketUpdateWithoutStoreInput.schema';
import { PosTicketUncheckedUpdateWithoutStoreInputObjectSchema as PosTicketUncheckedUpdateWithoutStoreInputObjectSchema } from './PosTicketUncheckedUpdateWithoutStoreInput.schema';
import { PosTicketCreateWithoutStoreInputObjectSchema as PosTicketCreateWithoutStoreInputObjectSchema } from './PosTicketCreateWithoutStoreInput.schema';
import { PosTicketUncheckedCreateWithoutStoreInputObjectSchema as PosTicketUncheckedCreateWithoutStoreInputObjectSchema } from './PosTicketUncheckedCreateWithoutStoreInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosTicketWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PosTicketUpdateWithoutStoreInputObjectSchema), z.lazy(() => PosTicketUncheckedUpdateWithoutStoreInputObjectSchema)]),
  create: z.union([z.lazy(() => PosTicketCreateWithoutStoreInputObjectSchema), z.lazy(() => PosTicketUncheckedCreateWithoutStoreInputObjectSchema)])
}).strict();
export const PosTicketUpsertWithWhereUniqueWithoutStoreInputObjectSchema: z.ZodType<Prisma.PosTicketUpsertWithWhereUniqueWithoutStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUpsertWithWhereUniqueWithoutStoreInput>;
export const PosTicketUpsertWithWhereUniqueWithoutStoreInputObjectZodSchema = makeSchema();
