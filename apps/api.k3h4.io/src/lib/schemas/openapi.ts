import * as z from 'zod';

import {ACTOR_TYPES, ENTITY_DIRECTIONS, ENTITY_KINDS} from '../actor-entity-constants';
import {BUILDING_TYPES, CHAT_ROLES, COVERAGE_STATUSES, ENGAGEMENT_PRIORITIES, LIFECYCLE_STATUSES, WAREHOUSE_CATEGORIES} from '../domain-constants';

export const toJsonSchema = (schema: z.ZodTypeAny, name?: string) => {
  const jsonSchema = schema.toJSONSchema() as Record<string, any>;
  if (name && !jsonSchema.title) jsonSchema.title = name;
  const {['~standard']: _omit, $schema: _schema, ...cleaned} =
      jsonSchema as Record<string, any>;
  return cleaned as object;
};

export const withExamples =
    <T extends Record<string, any>>(schema: T, examples: unknown[]) => ({
      ...schema,
      examples,
    });

export const IdSchema = z.string().min(1).describe('Unique identifier');
export const OptionalIdSchema = IdSchema.optional();

export const StringArraySchema = z.array(z.string().min(1));

export const NumberLikeSchema = z.union([
  z.number(),
  z.string().min(1).describe('Numeric value'),
]);

export const IntegerLikeSchema = z.union([
  z.number().int(),
  z.string().regex(/^\d+$/).describe('Integer value'),
]);

export const PaginationQuerySchema =
    z.object({
       limit: IntegerLikeSchema.describe('Max items to return').optional(),
       cursor: z.string().min(1).describe('Cursor for pagination').optional(),
       offset: IntegerLikeSchema.describe('Offset for pagination').optional(),
       page: IntegerLikeSchema.describe('Page number').optional(),
     }).strict();

export const CommonFilterSchema =
    z.object({
       q: z.string().min(1).describe('Search query').optional(),
       sort: z.string().min(1).describe('Sort field').optional(),
       order: z.enum(['asc', 'desc']).optional(),
       include: z.union([z.string(), StringArraySchema]).optional(),
       fields: z.union([z.string(), StringArraySchema]).optional(),
     }).strict();

export const AuthHeaderSchema =
    z.object({
       authorization: z.string().min(1).describe('Bearer access token'),
     }).strict();

export const OptionalAuthHeaderSchema =
    z.object({
       authorization: z.string().min(1).optional(),
     }).strict();

export const IfNoneMatchHeaderSchema =
    z.object({
       'if-none-match': z.string().min(1).optional(),
     }).strict();

export const ErrorResponseSchema = z.object({
                                      error: z.string().min(1),
                                      code: z.number().int().optional(),
                                      retryAfter: z.number().int().optional(),
                                    }).strict();

export const OkResponseSchema = z.object({
                                   ok: z.literal(true),
                                 }).strict();

export const ActorTypeSchema = z.enum(Object.values(ACTOR_TYPES));
export const EntityKindSchema = z.enum(Object.values(ENTITY_KINDS));
export const EntityDirectionSchema = z.enum(Object.values(ENTITY_DIRECTIONS));
export const LifecycleStatusSchema = z.enum(Object.values(LIFECYCLE_STATUSES));
export const EngagementPrioritySchema =
    z.enum(Object.values(ENGAGEMENT_PRIORITIES));
export const CoverageStatusSchema = z.enum(Object.values(COVERAGE_STATUSES));
export const WarehouseCategorySchema =
    z.enum(Object.values(WAREHOUSE_CATEGORIES));
export const ChatRoleSchema = z.enum(Object.values(CHAT_ROLES));
export const BuildingTypeSchema = z.enum(Object.values(BUILDING_TYPES));

export const BboxSchema = z.object({
                             minLon: z.number(),
                             minLat: z.number(),
                             maxLon: z.number(),
                             maxLat: z.number(),
                           }).strict();

export const LatSchema = z.number().min(-90).max(90);
export const LonSchema = z.number().min(-180).max(180);

export const ZxyParamsSchema = z.object({
                                  z: IntegerLikeSchema,
                                  x: IntegerLikeSchema,
                                  y: IntegerLikeSchema,
                                }).strict();

export const GeoFormatSchema = z.enum(['png', 'webp']);

export const StandardErrorResponses = {
  400: toJsonSchema(ErrorResponseSchema, 'BadRequest'),
  401: toJsonSchema(ErrorResponseSchema, 'Unauthorized'),
  403: toJsonSchema(ErrorResponseSchema, 'Forbidden'),
  404: toJsonSchema(ErrorResponseSchema, 'NotFound'),
  409: toJsonSchema(ErrorResponseSchema, 'Conflict'),
  500: toJsonSchema(ErrorResponseSchema, 'ServerError'),
};
