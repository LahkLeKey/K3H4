import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutProviderGrantsInputObjectSchema as UserCreateNestedOneWithoutProviderGrantsInputObjectSchema } from './UserCreateNestedOneWithoutProviderGrantsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  provider: z.string(),
  providerId: z.string(),
  accessToken: z.string(),
  scope: z.string().optional().nullable(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProviderGrantsInputObjectSchema)
}).strict();
export const ProviderGrantCreateInputObjectSchema: z.ZodType<Prisma.ProviderGrantCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantCreateInput>;
export const ProviderGrantCreateInputObjectZodSchema = makeSchema();
