import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutCompatibilityTargetsInputObjectSchema as PersonaCreateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaCreateWithoutCompatibilityTargetsInput.schema';
import { PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectSchema as PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaUncheckedCreateWithoutCompatibilityTargetsInput.schema';
import { PersonaCreateOrConnectWithoutCompatibilityTargetsInputObjectSchema as PersonaCreateOrConnectWithoutCompatibilityTargetsInputObjectSchema } from './PersonaCreateOrConnectWithoutCompatibilityTargetsInput.schema';
import { PersonaUpsertWithoutCompatibilityTargetsInputObjectSchema as PersonaUpsertWithoutCompatibilityTargetsInputObjectSchema } from './PersonaUpsertWithoutCompatibilityTargetsInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaUpdateToOneWithWhereWithoutCompatibilityTargetsInputObjectSchema as PersonaUpdateToOneWithWhereWithoutCompatibilityTargetsInputObjectSchema } from './PersonaUpdateToOneWithWhereWithoutCompatibilityTargetsInput.schema';
import { PersonaUpdateWithoutCompatibilityTargetsInputObjectSchema as PersonaUpdateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaUpdateWithoutCompatibilityTargetsInput.schema';
import { PersonaUncheckedUpdateWithoutCompatibilityTargetsInputObjectSchema as PersonaUncheckedUpdateWithoutCompatibilityTargetsInputObjectSchema } from './PersonaUncheckedUpdateWithoutCompatibilityTargetsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutCompatibilityTargetsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutCompatibilityTargetsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutCompatibilityTargetsInputObjectSchema).optional(),
  upsert: z.lazy(() => PersonaUpsertWithoutCompatibilityTargetsInputObjectSchema).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PersonaUpdateToOneWithWhereWithoutCompatibilityTargetsInputObjectSchema), z.lazy(() => PersonaUpdateWithoutCompatibilityTargetsInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutCompatibilityTargetsInputObjectSchema)]).optional()
}).strict();
export const PersonaUpdateOneRequiredWithoutCompatibilityTargetsNestedInputObjectSchema: z.ZodType<Prisma.PersonaUpdateOneRequiredWithoutCompatibilityTargetsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateOneRequiredWithoutCompatibilityTargetsNestedInput>;
export const PersonaUpdateOneRequiredWithoutCompatibilityTargetsNestedInputObjectZodSchema = makeSchema();
