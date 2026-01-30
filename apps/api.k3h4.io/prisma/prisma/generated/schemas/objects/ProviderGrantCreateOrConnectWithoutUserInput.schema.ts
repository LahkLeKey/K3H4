import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProviderGrantWhereUniqueInputObjectSchema as ProviderGrantWhereUniqueInputObjectSchema } from './ProviderGrantWhereUniqueInput.schema';
import { ProviderGrantCreateWithoutUserInputObjectSchema as ProviderGrantCreateWithoutUserInputObjectSchema } from './ProviderGrantCreateWithoutUserInput.schema';
import { ProviderGrantUncheckedCreateWithoutUserInputObjectSchema as ProviderGrantUncheckedCreateWithoutUserInputObjectSchema } from './ProviderGrantUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProviderGrantWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProviderGrantCreateWithoutUserInputObjectSchema), z.lazy(() => ProviderGrantUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ProviderGrantCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ProviderGrantCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantCreateOrConnectWithoutUserInput>;
export const ProviderGrantCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
