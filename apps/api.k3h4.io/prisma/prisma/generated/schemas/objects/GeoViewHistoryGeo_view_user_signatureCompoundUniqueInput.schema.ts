import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  userId: z.string(),
  signature: z.string()
}).strict();
export const GeoViewHistoryGeo_view_user_signatureCompoundUniqueInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryGeo_view_user_signatureCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryGeo_view_user_signatureCompoundUniqueInput>;
export const GeoViewHistoryGeo_view_user_signatureCompoundUniqueInputObjectZodSchema = makeSchema();
