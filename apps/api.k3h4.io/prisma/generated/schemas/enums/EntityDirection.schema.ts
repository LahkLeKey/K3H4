import * as z from 'zod';

export const EntityDirectionSchema = z.enum(['CREDIT', 'DEBIT'])

export type EntityDirection = z.infer<typeof EntityDirectionSchema>;