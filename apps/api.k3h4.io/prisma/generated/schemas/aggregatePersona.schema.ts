import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaOrderByWithRelationInputObjectSchema as PersonaOrderByWithRelationInputObjectSchema } from './objects/PersonaOrderByWithRelationInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './objects/PersonaWhereInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './objects/PersonaWhereUniqueInput.schema';
import { PersonaCountAggregateInputObjectSchema as PersonaCountAggregateInputObjectSchema } from './objects/PersonaCountAggregateInput.schema';
import { PersonaMinAggregateInputObjectSchema as PersonaMinAggregateInputObjectSchema } from './objects/PersonaMinAggregateInput.schema';
import { PersonaMaxAggregateInputObjectSchema as PersonaMaxAggregateInputObjectSchema } from './objects/PersonaMaxAggregateInput.schema';

export const PersonaAggregateSchema: z.ZodType<Prisma.PersonaAggregateArgs> = z.object({ orderBy: z.union([PersonaOrderByWithRelationInputObjectSchema, PersonaOrderByWithRelationInputObjectSchema.array()]).optional(), where: PersonaWhereInputObjectSchema.optional(), cursor: PersonaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PersonaCountAggregateInputObjectSchema ]).optional(), _min: PersonaMinAggregateInputObjectSchema.optional(), _max: PersonaMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PersonaAggregateArgs>;

export const PersonaAggregateZodSchema = z.object({ orderBy: z.union([PersonaOrderByWithRelationInputObjectSchema, PersonaOrderByWithRelationInputObjectSchema.array()]).optional(), where: PersonaWhereInputObjectSchema.optional(), cursor: PersonaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PersonaCountAggregateInputObjectSchema ]).optional(), _min: PersonaMinAggregateInputObjectSchema.optional(), _max: PersonaMaxAggregateInputObjectSchema.optional() }).strict();