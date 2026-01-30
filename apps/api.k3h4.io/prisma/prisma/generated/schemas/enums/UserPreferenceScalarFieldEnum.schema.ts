import * as z from 'zod';

export const UserPreferenceScalarFieldEnumSchema = z.enum(['id', 'userId', 'theme', 'locale', 'timezone', 'marketingOptIn', 'note', 'lastCenterLat', 'lastCenterLng', 'lastZoom', 'lastBearing', 'lastPitch', 'lastPoiSignature', 'lastPoiKinds', 'lastPoiRadiusM', 'lastPoiCount', 'lastPoiFetchedAt', 'maptilerStyle', 'maptilerLanguage', 'maptilerLastPath', 'maptilerLastParams', 'maptilerLastKind', 'maptilerLastSignature', 'maptilerLastFetchedAt', 'createdAt', 'updatedAt'])

export type UserPreferenceScalarFieldEnum = z.infer<typeof UserPreferenceScalarFieldEnumSchema>;