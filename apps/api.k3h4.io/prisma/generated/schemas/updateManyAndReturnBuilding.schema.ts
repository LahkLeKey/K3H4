import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BuildingSelectObjectSchema as BuildingSelectObjectSchema } from './objects/BuildingSelect.schema';
import { BuildingUpdateManyMutationInputObjectSchema as BuildingUpdateManyMutationInputObjectSchema } from './objects/BuildingUpdateManyMutationInput.schema';
import { BuildingWhereInputObjectSchema as BuildingWhereInputObjectSchema } from './objects/BuildingWhereInput.schema';

export const BuildingUpdateManyAndReturnSchema: z.ZodType<Prisma.BuildingUpdateManyAndReturnArgs> = z.object({ select: BuildingSelectObjectSchema.optional(), data: BuildingUpdateManyMutationInputObjectSchema, where: BuildingWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BuildingUpdateManyAndReturnArgs>;

export const BuildingUpdateManyAndReturnZodSchema = z.object({ select: BuildingSelectObjectSchema.optional(), data: BuildingUpdateManyMutationInputObjectSchema, where: BuildingWhereInputObjectSchema.optional() }).strict();