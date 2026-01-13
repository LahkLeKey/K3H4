import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreUserIdNameCompoundUniqueInputObjectSchema as PosStoreUserIdNameCompoundUniqueInputObjectSchema } from './PosStoreUserIdNameCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId_name: z.lazy(() => PosStoreUserIdNameCompoundUniqueInputObjectSchema).optional()
}).strict();
export const PosStoreWhereUniqueInputObjectSchema: z.ZodType<Prisma.PosStoreWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreWhereUniqueInput>;
export const PosStoreWhereUniqueInputObjectZodSchema = makeSchema();
