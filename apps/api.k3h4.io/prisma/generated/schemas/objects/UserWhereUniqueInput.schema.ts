import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProviderProviderIdCompoundUniqueInputObjectSchema as UserProviderProviderIdCompoundUniqueInputObjectSchema } from './UserProviderProviderIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  provider_providerId: z.lazy(() => UserProviderProviderIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const UserWhereUniqueInputObjectSchema: z.ZodType<Prisma.UserWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UserWhereUniqueInput>;
export const UserWhereUniqueInputObjectZodSchema = makeSchema();
