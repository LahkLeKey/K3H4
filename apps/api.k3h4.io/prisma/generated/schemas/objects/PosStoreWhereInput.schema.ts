import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { PosTicketListRelationFilterObjectSchema as PosTicketListRelationFilterObjectSchema } from './PosTicketListRelationFilter.schema'

const posstorewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PosStoreWhereInputObjectSchema), z.lazy(() => PosStoreWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PosStoreWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PosStoreWhereInputObjectSchema), z.lazy(() => PosStoreWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  channel: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  tickets: z.lazy(() => PosTicketListRelationFilterObjectSchema).optional()
}).strict();
export const PosStoreWhereInputObjectSchema: z.ZodType<Prisma.PosStoreWhereInput> = posstorewhereinputSchema as unknown as z.ZodType<Prisma.PosStoreWhereInput>;
export const PosStoreWhereInputObjectZodSchema = posstorewhereinputSchema;
