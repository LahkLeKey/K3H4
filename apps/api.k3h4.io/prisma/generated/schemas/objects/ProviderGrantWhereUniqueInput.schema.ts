import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProviderGrantProviderProviderIdCompoundUniqueInputObjectSchema as ProviderGrantProviderProviderIdCompoundUniqueInputObjectSchema } from './ProviderGrantProviderProviderIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  provider_providerId: z.lazy(() => ProviderGrantProviderProviderIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const ProviderGrantWhereUniqueInputObjectSchema: z.ZodType<Prisma.ProviderGrantWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantWhereUniqueInput>;
export const ProviderGrantWhereUniqueInputObjectZodSchema = makeSchema();
