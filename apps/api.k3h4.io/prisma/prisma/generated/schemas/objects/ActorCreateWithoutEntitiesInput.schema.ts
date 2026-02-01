import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { ActorTypeSchema } from '../enums/ActorType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutActorsInputObjectSchema as UserCreateNestedOneWithoutActorsInputObjectSchema } from './UserCreateNestedOneWithoutActorsInput.schema';
import { ActorCacheCreateNestedManyWithoutActorInputObjectSchema as ActorCacheCreateNestedManyWithoutActorInputObjectSchema } from './ActorCacheCreateNestedManyWithoutActorInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  label: z.string(),
  type: ActorTypeSchema,
  note: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  osmType: z.string().optional().nullable(),
  osmId: z.bigint().optional().nullable(),
  latitude: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'latitude' must be a Decimal",
}).optional().nullable(),
  longitude: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'longitude' must be a Decimal",
}).optional().nullable(),
  category: z.string().optional().nullable(),
  lastSeenAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutActorsInputObjectSchema).optional(),
  caches: z.lazy(() => ActorCacheCreateNestedManyWithoutActorInputObjectSchema).optional()
}).strict();
export const ActorCreateWithoutEntitiesInputObjectSchema: z.ZodType<Prisma.ActorCreateWithoutEntitiesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateWithoutEntitiesInput>;
export const ActorCreateWithoutEntitiesInputObjectZodSchema = makeSchema();
