import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserPreferenceIncludeObjectSchema as UserPreferenceIncludeObjectSchema } from './objects/UserPreferenceInclude.schema';
import { UserPreferenceOrderByWithRelationInputObjectSchema as UserPreferenceOrderByWithRelationInputObjectSchema } from './objects/UserPreferenceOrderByWithRelationInput.schema';
import { UserPreferenceWhereInputObjectSchema as UserPreferenceWhereInputObjectSchema } from './objects/UserPreferenceWhereInput.schema';
import { UserPreferenceWhereUniqueInputObjectSchema as UserPreferenceWhereUniqueInputObjectSchema } from './objects/UserPreferenceWhereUniqueInput.schema';
import { UserPreferenceScalarFieldEnumSchema } from './enums/UserPreferenceScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserPreferenceFindManySelectSchema: z.ZodType<Prisma.UserPreferenceSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    theme: z.boolean().optional(),
    locale: z.boolean().optional(),
    timezone: z.boolean().optional(),
    marketingOptIn: z.boolean().optional(),
    note: z.boolean().optional(),
    lastCenterLat: z.boolean().optional(),
    lastCenterLng: z.boolean().optional(),
    lastZoom: z.boolean().optional(),
    lastBearing: z.boolean().optional(),
    lastPitch: z.boolean().optional(),
    lastPoiSignature: z.boolean().optional(),
    lastPoiKinds: z.boolean().optional(),
    lastPoiRadiusM: z.boolean().optional(),
    lastPoiCount: z.boolean().optional(),
    lastPoiFetchedAt: z.boolean().optional(),
    maptilerStyle: z.boolean().optional(),
    maptilerLanguage: z.boolean().optional(),
    maptilerLastPath: z.boolean().optional(),
    maptilerLastParams: z.boolean().optional(),
    maptilerLastKind: z.boolean().optional(),
    maptilerLastSignature: z.boolean().optional(),
    maptilerLastFetchedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UserPreferenceSelect>;

export const UserPreferenceFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    theme: z.boolean().optional(),
    locale: z.boolean().optional(),
    timezone: z.boolean().optional(),
    marketingOptIn: z.boolean().optional(),
    note: z.boolean().optional(),
    lastCenterLat: z.boolean().optional(),
    lastCenterLng: z.boolean().optional(),
    lastZoom: z.boolean().optional(),
    lastBearing: z.boolean().optional(),
    lastPitch: z.boolean().optional(),
    lastPoiSignature: z.boolean().optional(),
    lastPoiKinds: z.boolean().optional(),
    lastPoiRadiusM: z.boolean().optional(),
    lastPoiCount: z.boolean().optional(),
    lastPoiFetchedAt: z.boolean().optional(),
    maptilerStyle: z.boolean().optional(),
    maptilerLanguage: z.boolean().optional(),
    maptilerLastPath: z.boolean().optional(),
    maptilerLastParams: z.boolean().optional(),
    maptilerLastKind: z.boolean().optional(),
    maptilerLastSignature: z.boolean().optional(),
    maptilerLastFetchedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const UserPreferenceFindManySchema: z.ZodType<Prisma.UserPreferenceFindManyArgs> = z.object({ select: UserPreferenceFindManySelectSchema.optional(), include: z.lazy(() => UserPreferenceIncludeObjectSchema.optional()), orderBy: z.union([UserPreferenceOrderByWithRelationInputObjectSchema, UserPreferenceOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserPreferenceWhereInputObjectSchema.optional(), cursor: UserPreferenceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserPreferenceScalarFieldEnumSchema, UserPreferenceScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UserPreferenceFindManyArgs>;

export const UserPreferenceFindManyZodSchema = z.object({ select: UserPreferenceFindManySelectSchema.optional(), include: z.lazy(() => UserPreferenceIncludeObjectSchema.optional()), orderBy: z.union([UserPreferenceOrderByWithRelationInputObjectSchema, UserPreferenceOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserPreferenceWhereInputObjectSchema.optional(), cursor: UserPreferenceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserPreferenceScalarFieldEnumSchema, UserPreferenceScalarFieldEnumSchema.array()]).optional() }).strict();