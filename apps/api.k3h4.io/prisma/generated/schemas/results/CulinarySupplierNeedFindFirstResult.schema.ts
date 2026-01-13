import * as z from 'zod';
export const CulinarySupplierNeedFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  item: z.string(),
  quantity: z.string(),
  status: z.string(),
  dueDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));