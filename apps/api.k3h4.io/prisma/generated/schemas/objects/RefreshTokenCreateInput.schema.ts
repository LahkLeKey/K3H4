import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutRefreshTokensInputObjectSchema as UserCreateNestedOneWithoutRefreshTokensInputObjectSchema } from './UserCreateNestedOneWithoutRefreshTokensInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutRefreshTokensInputObjectSchema)
}).strict();
export const RefreshTokenCreateInputObjectSchema: z.ZodType<Prisma.RefreshTokenCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenCreateInput>;
export const RefreshTokenCreateInputObjectZodSchema = makeSchema();
