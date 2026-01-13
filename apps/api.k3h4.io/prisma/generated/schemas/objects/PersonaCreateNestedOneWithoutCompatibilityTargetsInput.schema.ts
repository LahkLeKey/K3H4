import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutCompatibilityTargetsInputObjectSchema as PersonaCreateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaCreateWithoutCompatibilityTargetsInput.schema';
import { PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectSchema as PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaUncheckedCreateWithoutCompatibilityTargetsInput.schema';
import { PersonaCreateOrConnectWithoutCompatibilityTargetsInputObjectSchema as PersonaCreateOrConnectWithoutCompatibilityTargetsInputObjectSchema } from './PersonaCreateOrConnectWithoutCompatibilityTargetsInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutCompatibilityTargetsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutCompatibilityTargetsInputObjectSchema).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional()
}).strict();
export const PersonaCreateNestedOneWithoutCompatibilityTargetsInputObjectSchema: z.ZodType<Prisma.PersonaCreateNestedOneWithoutCompatibilityTargetsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateNestedOneWithoutCompatibilityTargetsInput>;
export const PersonaCreateNestedOneWithoutCompatibilityTargetsInputObjectZodSchema = makeSchema();
