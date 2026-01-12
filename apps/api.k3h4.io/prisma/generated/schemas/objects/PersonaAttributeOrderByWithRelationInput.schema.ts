import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { PersonaOrderByWithRelationInputObjectSchema as PersonaOrderByWithRelationInputObjectSchema } from './PersonaOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  personaId: SortOrderSchema.optional(),
  category: SortOrderSchema.optional(),
  value: SortOrderSchema.optional(),
  weight: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  persona: z.lazy(() => PersonaOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const PersonaAttributeOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PersonaAttributeOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeOrderByWithRelationInput>;
export const PersonaAttributeOrderByWithRelationInputObjectZodSchema = makeSchema();
