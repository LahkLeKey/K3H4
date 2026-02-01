import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema as TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './TelemetryEventUncheckedCreateNestedManyWithoutUserInput.schema';
import { ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema as ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ActorUncheckedCreateNestedManyWithoutUserInput.schema'

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
  telemetry: z.lazy(() => TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  actors: z.lazy(() => ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema = makeSchema();
