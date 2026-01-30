import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntitySelectObjectSchema as EntitySelectObjectSchema } from './objects/EntitySelect.schema';
import { EntityIncludeObjectSchema as EntityIncludeObjectSchema } from './objects/EntityInclude.schema';
import { EntityCreateInputObjectSchema as EntityCreateInputObjectSchema } from './objects/EntityCreateInput.schema';
import { EntityUncheckedCreateInputObjectSchema as EntityUncheckedCreateInputObjectSchema } from './objects/EntityUncheckedCreateInput.schema';

export const EntityCreateOneSchema: z.ZodType<Prisma.EntityCreateArgs> = z.object({ select: EntitySelectObjectSchema.optional(), include: EntityIncludeObjectSchema.optional(), data: z.union([EntityCreateInputObjectSchema, EntityUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.EntityCreateArgs>;

export const EntityCreateOneZodSchema = z.object({ select: EntitySelectObjectSchema.optional(), include: EntityIncludeObjectSchema.optional(), data: z.union([EntityCreateInputObjectSchema, EntityUncheckedCreateInputObjectSchema]) }).strict();