import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaCreateWithoutCompatibilityTargetsInputObjectSchema as PersonaCreateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaCreateWithoutCompatibilityTargetsInput.schema';
import { PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectSchema as PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaUncheckedCreateWithoutCompatibilityTargetsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaCreateWithoutCompatibilityTargetsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectSchema)])
}).strict();
export const PersonaCreateOrConnectWithoutCompatibilityTargetsInputObjectSchema: z.ZodType<Prisma.PersonaCreateOrConnectWithoutCompatibilityTargetsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateOrConnectWithoutCompatibilityTargetsInput>;
export const PersonaCreateOrConnectWithoutCompatibilityTargetsInputObjectZodSchema = makeSchema();
