import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaCreateWithoutCompatibilitySourcesInputObjectSchema as PersonaCreateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaCreateWithoutCompatibilitySourcesInput.schema';
import { PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectSchema as PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaUncheckedCreateWithoutCompatibilitySourcesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaCreateWithoutCompatibilitySourcesInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectSchema)])
}).strict();
export const PersonaCreateOrConnectWithoutCompatibilitySourcesInputObjectSchema: z.ZodType<Prisma.PersonaCreateOrConnectWithoutCompatibilitySourcesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateOrConnectWithoutCompatibilitySourcesInput>;
export const PersonaCreateOrConnectWithoutCompatibilitySourcesInputObjectZodSchema = makeSchema();
