import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutAssignmentsInputObjectSchema as PersonaCreateWithoutAssignmentsInputObjectSchema } from './PersonaCreateWithoutAssignmentsInput.schema';
import { PersonaUncheckedCreateWithoutAssignmentsInputObjectSchema as PersonaUncheckedCreateWithoutAssignmentsInputObjectSchema } from './PersonaUncheckedCreateWithoutAssignmentsInput.schema';
import { PersonaCreateOrConnectWithoutAssignmentsInputObjectSchema as PersonaCreateOrConnectWithoutAssignmentsInputObjectSchema } from './PersonaCreateOrConnectWithoutAssignmentsInput.schema';
import { PersonaUpsertWithoutAssignmentsInputObjectSchema as PersonaUpsertWithoutAssignmentsInputObjectSchema } from './PersonaUpsertWithoutAssignmentsInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaUpdateToOneWithWhereWithoutAssignmentsInputObjectSchema as PersonaUpdateToOneWithWhereWithoutAssignmentsInputObjectSchema } from './PersonaUpdateToOneWithWhereWithoutAssignmentsInput.schema';
import { PersonaUpdateWithoutAssignmentsInputObjectSchema as PersonaUpdateWithoutAssignmentsInputObjectSchema } from './PersonaUpdateWithoutAssignmentsInput.schema';
import { PersonaUncheckedUpdateWithoutAssignmentsInputObjectSchema as PersonaUncheckedUpdateWithoutAssignmentsInputObjectSchema } from './PersonaUncheckedUpdateWithoutAssignmentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutAssignmentsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutAssignmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutAssignmentsInputObjectSchema).optional(),
  upsert: z.lazy(() => PersonaUpsertWithoutAssignmentsInputObjectSchema).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PersonaUpdateToOneWithWhereWithoutAssignmentsInputObjectSchema), z.lazy(() => PersonaUpdateWithoutAssignmentsInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutAssignmentsInputObjectSchema)]).optional()
}).strict();
export const PersonaUpdateOneRequiredWithoutAssignmentsNestedInputObjectSchema: z.ZodType<Prisma.PersonaUpdateOneRequiredWithoutAssignmentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateOneRequiredWithoutAssignmentsNestedInput>;
export const PersonaUpdateOneRequiredWithoutAssignmentsNestedInputObjectZodSchema = makeSchema();
