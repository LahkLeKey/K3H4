import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaOrderByWithRelationInputObjectSchema as PersonaOrderByWithRelationInputObjectSchema } from './objects/PersonaOrderByWithRelationInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './objects/PersonaWhereInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './objects/PersonaWhereUniqueInput.schema';
import { PersonaCountAggregateInputObjectSchema as PersonaCountAggregateInputObjectSchema } from './objects/PersonaCountAggregateInput.schema';

export const PersonaCountSchema: z.ZodType<Prisma.PersonaCountArgs> = z.object({ orderBy: z.union([PersonaOrderByWithRelationInputObjectSchema, PersonaOrderByWithRelationInputObjectSchema.array()]).optional(), where: PersonaWhereInputObjectSchema.optional(), cursor: PersonaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PersonaCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PersonaCountArgs>;

export const PersonaCountZodSchema = z.object({ orderBy: z.union([PersonaOrderByWithRelationInputObjectSchema, PersonaOrderByWithRelationInputObjectSchema.array()]).optional(), where: PersonaWhereInputObjectSchema.optional(), cursor: PersonaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PersonaCountAggregateInputObjectSchema ]).optional() }).strict();