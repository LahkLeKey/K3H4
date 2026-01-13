import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutCompatibilitySourcesInputObjectSchema as PersonaCreateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaCreateWithoutCompatibilitySourcesInput.schema';
import { PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectSchema as PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaUncheckedCreateWithoutCompatibilitySourcesInput.schema';
import { PersonaCreateOrConnectWithoutCompatibilitySourcesInputObjectSchema as PersonaCreateOrConnectWithoutCompatibilitySourcesInputObjectSchema } from './PersonaCreateOrConnectWithoutCompatibilitySourcesInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutCompatibilitySourcesInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutCompatibilitySourcesInputObjectSchema).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional()
}).strict();
export const PersonaCreateNestedOneWithoutCompatibilitySourcesInputObjectSchema: z.ZodType<Prisma.PersonaCreateNestedOneWithoutCompatibilitySourcesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateNestedOneWithoutCompatibilitySourcesInput>;
export const PersonaCreateNestedOneWithoutCompatibilitySourcesInputObjectZodSchema = makeSchema();
