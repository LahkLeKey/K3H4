import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorActor_poi_osm_uniqueCompoundUniqueInputObjectSchema as ActorActor_poi_osm_uniqueCompoundUniqueInputObjectSchema } from './ActorActor_poi_osm_uniqueCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  actor_poi_osm_unique: z.lazy(() => ActorActor_poi_osm_uniqueCompoundUniqueInputObjectSchema).optional()
}).strict();
export const ActorWhereUniqueInputObjectSchema: z.ZodType<Prisma.ActorWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorWhereUniqueInput>;
export const ActorWhereUniqueInputObjectZodSchema = makeSchema();
