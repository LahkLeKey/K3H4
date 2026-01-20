import * as z from 'zod';

export const GeoViewHistoryScalarFieldEnumSchema = z.enum(['id', 'userId', 'signature', 'zoomBand', 'bboxMinLat', 'bboxMinLng', 'bboxMaxLat', 'bboxMaxLng', 'lastPoiIds', 'lastPoiCount', 'firstViewedAt', 'lastViewedAt', 'viewCount', 'staleAfter'])

export type GeoViewHistoryScalarFieldEnum = z.infer<typeof GeoViewHistoryScalarFieldEnumSchema>;