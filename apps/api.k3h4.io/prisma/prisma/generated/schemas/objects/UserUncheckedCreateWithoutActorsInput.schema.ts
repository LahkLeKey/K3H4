import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema as TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './TelemetryEventUncheckedCreateNestedManyWithoutUserInput.schema';
import { ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema as ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ChatSessionUncheckedCreateNestedManyWithoutUserInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  email: z.string(),
  provider: z.string(),
  providerId: z.string(),
  k3h4CoinBalance: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'k3h4CoinBalance' must be a Decimal",
}).optional(),
  displayName: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  telemetry: z.lazy(() => TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutActorsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutActorsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutActorsInput>;
export const UserUncheckedCreateWithoutActorsInputObjectZodSchema = makeSchema();
