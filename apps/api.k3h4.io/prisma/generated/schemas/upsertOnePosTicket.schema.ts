import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosTicketSelectObjectSchema as PosTicketSelectObjectSchema } from './objects/PosTicketSelect.schema';
import { PosTicketIncludeObjectSchema as PosTicketIncludeObjectSchema } from './objects/PosTicketInclude.schema';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './objects/PosTicketWhereUniqueInput.schema';
import { PosTicketCreateInputObjectSchema as PosTicketCreateInputObjectSchema } from './objects/PosTicketCreateInput.schema';
import { PosTicketUncheckedCreateInputObjectSchema as PosTicketUncheckedCreateInputObjectSchema } from './objects/PosTicketUncheckedCreateInput.schema';
import { PosTicketUpdateInputObjectSchema as PosTicketUpdateInputObjectSchema } from './objects/PosTicketUpdateInput.schema';
import { PosTicketUncheckedUpdateInputObjectSchema as PosTicketUncheckedUpdateInputObjectSchema } from './objects/PosTicketUncheckedUpdateInput.schema';

export const PosTicketUpsertOneSchema: z.ZodType<Prisma.PosTicketUpsertArgs> = z.object({ select: PosTicketSelectObjectSchema.optional(), include: PosTicketIncludeObjectSchema.optional(), where: PosTicketWhereUniqueInputObjectSchema, create: z.union([ PosTicketCreateInputObjectSchema, PosTicketUncheckedCreateInputObjectSchema ]), update: z.union([ PosTicketUpdateInputObjectSchema, PosTicketUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PosTicketUpsertArgs>;

export const PosTicketUpsertOneZodSchema = z.object({ select: PosTicketSelectObjectSchema.optional(), include: PosTicketIncludeObjectSchema.optional(), where: PosTicketWhereUniqueInputObjectSchema, create: z.union([ PosTicketCreateInputObjectSchema, PosTicketUncheckedCreateInputObjectSchema ]), update: z.union([ PosTicketUpdateInputObjectSchema, PosTicketUncheckedUpdateInputObjectSchema ]) }).strict();