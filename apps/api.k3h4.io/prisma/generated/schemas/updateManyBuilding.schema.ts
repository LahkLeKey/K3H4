import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BuildingUpdateManyMutationInputObjectSchema as BuildingUpdateManyMutationInputObjectSchema } from './objects/BuildingUpdateManyMutationInput.schema';
import { BuildingWhereInputObjectSchema as BuildingWhereInputObjectSchema } from './objects/BuildingWhereInput.schema';

export const BuildingUpdateManySchema: z.ZodType<Prisma.BuildingUpdateManyArgs> = z.object({ data: BuildingUpdateManyMutationInputObjectSchema, where: BuildingWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BuildingUpdateManyArgs>;

export const BuildingUpdateManyZodSchema = z.object({ data: BuildingUpdateManyMutationInputObjectSchema, where: BuildingWhereInputObjectSchema.optional() }).strict();