import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorTypeSchema } from '../enums/ActorType.schema'

const makeSchema = () => z.object({
  type: ActorTypeSchema,
  osmType: z.string(),
  osmId: z.bigint()
}).strict();
export const ActorActor_poi_osm_uniqueCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ActorActor_poi_osm_uniqueCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorActor_poi_osm_uniqueCompoundUniqueInput>;
export const ActorActor_poi_osm_uniqueCompoundUniqueInputObjectZodSchema = makeSchema();
