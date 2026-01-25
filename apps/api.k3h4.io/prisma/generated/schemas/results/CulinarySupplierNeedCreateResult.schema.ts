import * as z from 'zod';
export const CulinarySupplierNeedCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  item: z.string(),
  quantity: z.string(),
  status: z.unknown(),
  dueDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});