import * as z from 'zod';

export const CoverageStatusSchema = z.enum(['UNFILLED', 'FILLED', 'PARTIAL'])

export type CoverageStatus = z.infer<typeof CoverageStatusSchema>;