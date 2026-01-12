import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './objects/PersonaWhereInput.schema';
import { PersonaOrderByWithAggregationInputObjectSchema as PersonaOrderByWithAggregationInputObjectSchema } from './objects/PersonaOrderByWithAggregationInput.schema';
import { PersonaScalarWhereWithAggregatesInputObjectSchema as PersonaScalarWhereWithAggregatesInputObjectSchema } from './objects/PersonaScalarWhereWithAggregatesInput.schema';
import { PersonaScalarFieldEnumSchema } from './enums/PersonaScalarFieldEnum.schema';
import { PersonaCountAggregateInputObjectSchema as PersonaCountAggregateInputObjectSchema } from './objects/PersonaCountAggregateInput.schema';
import { PersonaMinAggregateInputObjectSchema as PersonaMinAggregateInputObjectSchema } from './objects/PersonaMinAggregateInput.schema';
import { PersonaMaxAggregateInputObjectSchema as PersonaMaxAggregateInputObjectSchema } from './objects/PersonaMaxAggregateInput.schema';

export const PersonaGroupBySchema: z.ZodType<Prisma.PersonaGroupByArgs> = z.object({ where: PersonaWhereInputObjectSchema.optional(), orderBy: z.union([PersonaOrderByWithAggregationInputObjectSchema, PersonaOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PersonaScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PersonaScalarFieldEnumSchema), _count: z.union([ z.literal(true), PersonaCountAggregateInputObjectSchema ]).optional(), _min: PersonaMinAggregateInputObjectSchema.optional(), _max: PersonaMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PersonaGroupByArgs>;

export const PersonaGroupByZodSchema = z.object({ where: PersonaWhereInputObjectSchema.optional(), orderBy: z.union([PersonaOrderByWithAggregationInputObjectSchema, PersonaOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PersonaScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PersonaScalarFieldEnumSchema), _count: z.union([ z.literal(true), PersonaCountAggregateInputObjectSchema ]).optional(), _min: PersonaMinAggregateInputObjectSchema.optional(), _max: PersonaMaxAggregateInputObjectSchema.optional() }).strict();