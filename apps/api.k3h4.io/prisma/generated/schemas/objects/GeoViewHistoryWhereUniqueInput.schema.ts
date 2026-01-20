import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoViewHistoryGeo_view_user_signatureCompoundUniqueInputObjectSchema as GeoViewHistoryGeo_view_user_signatureCompoundUniqueInputObjectSchema } from './GeoViewHistoryGeo_view_user_signatureCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  geo_view_user_signature: z.lazy(() => GeoViewHistoryGeo_view_user_signatureCompoundUniqueInputObjectSchema).optional()
}).strict();
export const GeoViewHistoryWhereUniqueInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryWhereUniqueInput>;
export const GeoViewHistoryWhereUniqueInputObjectZodSchema = makeSchema();
