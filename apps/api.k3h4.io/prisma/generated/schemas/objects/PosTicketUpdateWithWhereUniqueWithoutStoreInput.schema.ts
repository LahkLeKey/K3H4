import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './PosTicketWhereUniqueInput.schema';
import { PosTicketUpdateWithoutStoreInputObjectSchema as PosTicketUpdateWithoutStoreInputObjectSchema } from './PosTicketUpdateWithoutStoreInput.schema';
import { PosTicketUncheckedUpdateWithoutStoreInputObjectSchema as PosTicketUncheckedUpdateWithoutStoreInputObjectSchema } from './PosTicketUncheckedUpdateWithoutStoreInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosTicketWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PosTicketUpdateWithoutStoreInputObjectSchema), z.lazy(() => PosTicketUncheckedUpdateWithoutStoreInputObjectSchema)])
}).strict();
export const PosTicketUpdateWithWhereUniqueWithoutStoreInputObjectSchema: z.ZodType<Prisma.PosTicketUpdateWithWhereUniqueWithoutStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUpdateWithWhereUniqueWithoutStoreInput>;
export const PosTicketUpdateWithWhereUniqueWithoutStoreInputObjectZodSchema = makeSchema();
