import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineWhereInputObjectSchema as ArcadeMachineWhereInputObjectSchema } from './ArcadeMachineWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ArcadeMachineWhereInputObjectSchema).optional(),
  some: z.lazy(() => ArcadeMachineWhereInputObjectSchema).optional(),
  none: z.lazy(() => ArcadeMachineWhereInputObjectSchema).optional()
}).strict();
export const ArcadeMachineListRelationFilterObjectSchema: z.ZodType<Prisma.ArcadeMachineListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineListRelationFilter>;
export const ArcadeMachineListRelationFilterObjectZodSchema = makeSchema();
