import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { TelemetryEventCreateNestedManyWithoutUserInputObjectSchema as TelemetryEventCreateNestedManyWithoutUserInputObjectSchema } from './TelemetryEventCreateNestedManyWithoutUserInput.schema';
import { ChatSessionCreateNestedManyWithoutUserInputObjectSchema as ChatSessionCreateNestedManyWithoutUserInputObjectSchema } from './ChatSessionCreateNestedManyWithoutUserInput.schema';
import { ActorCreateNestedManyWithoutUserInputObjectSchema as ActorCreateNestedManyWithoutUserInputObjectSchema } from './ActorCreateNestedManyWithoutUserInput.schema'

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
  telemetry: z.lazy(() => TelemetryEventCreateNestedManyWithoutUserInputObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionCreateNestedManyWithoutUserInputObjectSchema).optional(),
  actors: z.lazy(() => ActorCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateInputObjectSchema: z.ZodType<Prisma.UserCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateInput>;
export const UserCreateInputObjectZodSchema = makeSchema();
