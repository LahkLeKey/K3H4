import {z} from 'zod';

export const ActorRecordSchema =
    z.object({
       id: z.string(),
       userId: z.string().nullable().optional(),
       label: z.string(),
       type: z.string(),
       isGlobal: z.boolean(),
       note: z.string().nullable().optional(),
       source: z.string().nullable().optional(),
       metadata: z.unknown().nullable().optional(),
       category: z.string().nullable().optional(),
       lastSeenAt: z.string().nullable().optional(),
       createdAt: z.string(),
       updatedAt: z.string(),
     }).passthrough();

export const EntityRecordSchema =
    z.object({
       id: z.string(),
       actorId: z.string(),
       kind: z.string(),
       isGlobal: z.boolean(),
       direction: z.string().nullable().optional(),
       name: z.string().nullable().optional(),
       targetType: z.string().nullable().optional(),
       targetId: z.string().nullable().optional(),
       source: z.string().nullable().optional(),
       metadata: z.unknown().nullable().optional(),
       createdAt: z.string(),
       updatedAt: z.string(),
     }).passthrough();

export const ActorsResponseSchema = z.object({
  actors: z.array(ActorRecordSchema),
});

export const EntitiesResponseSchema = z.object({
  entities: z.array(EntityRecordSchema),
});

export const ActorResponseSchema = z.object({
  actor: ActorRecordSchema,
});

export const EntityResponseSchema = z.object({
  entity: EntityRecordSchema,
});

export const ActorCreateSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  type: z.string().min(1, 'Type is required'),
  note: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  metadata: z.unknown().nullable().optional(),
  category: z.string().nullable().optional(),
});

export const EntityCreateSchema = z.object({
  actorId: z.string().min(1, 'Actor is required'),
  kind: z.string().min(1, 'Kind is required'),
  direction: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  targetType: z.string().nullable().optional(),
  targetId: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  metadata: z.unknown().nullable().optional(),
});

export const ActorUpdateSchema = ActorCreateSchema.partial();
export const EntityUpdateSchema = EntityCreateSchema.partial();

export type ActorRecord = z.infer<typeof ActorRecordSchema>;
export type EntityRecord = z.infer<typeof EntityRecordSchema>;
export type ActorsResponse = z.infer<typeof ActorsResponseSchema>;
export type EntitiesResponse = z.infer<typeof EntitiesResponseSchema>;
export type ActorResponse = z.infer<typeof ActorResponseSchema>;
export type EntityResponse = z.infer<typeof EntityResponseSchema>;
export type ActorCreateInput = z.infer<typeof ActorCreateSchema>;
export type EntityCreateInput = z.infer<typeof EntityCreateSchema>;
export type ActorUpdateInput = z.infer<typeof ActorUpdateSchema>;
export type EntityUpdateInput = z.infer<typeof EntityUpdateSchema>;
