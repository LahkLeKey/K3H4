import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './PosTicketWhereUniqueInput.schema';
import { PosTicketCreateWithoutStoreInputObjectSchema as PosTicketCreateWithoutStoreInputObjectSchema } from './PosTicketCreateWithoutStoreInput.schema';
import { PosTicketUncheckedCreateWithoutStoreInputObjectSchema as PosTicketUncheckedCreateWithoutStoreInputObjectSchema } from './PosTicketUncheckedCreateWithoutStoreInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosTicketWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PosTicketCreateWithoutStoreInputObjectSchema), z.lazy(() => PosTicketUncheckedCreateWithoutStoreInputObjectSchema)])
}).strict();
export const PosTicketCreateOrConnectWithoutStoreInputObjectSchema: z.ZodType<Prisma.PosTicketCreateOrConnectWithoutStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketCreateOrConnectWithoutStoreInput>;
export const PosTicketCreateOrConnectWithoutStoreInputObjectZodSchema = makeSchema();
