import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutAssignmentPayoutsInputObjectSchema as PersonaCreateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaCreateWithoutAssignmentPayoutsInput.schema';
import { PersonaUncheckedCreateWithoutAssignmentPayoutsInputObjectSchema as PersonaUncheckedCreateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaUncheckedCreateWithoutAssignmentPayoutsInput.schema';
import { PersonaCreateOrConnectWithoutAssignmentPayoutsInputObjectSchema as PersonaCreateOrConnectWithoutAssignmentPayoutsInputObjectSchema } from './PersonaCreateOrConnectWithoutAssignmentPayoutsInput.schema';
import { PersonaUpsertWithoutAssignmentPayoutsInputObjectSchema as PersonaUpsertWithoutAssignmentPayoutsInputObjectSchema } from './PersonaUpsertWithoutAssignmentPayoutsInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaUpdateToOneWithWhereWithoutAssignmentPayoutsInputObjectSchema as PersonaUpdateToOneWithWhereWithoutAssignmentPayoutsInputObjectSchema } from './PersonaUpdateToOneWithWhereWithoutAssignmentPayoutsInput.schema';
import { PersonaUpdateWithoutAssignmentPayoutsInputObjectSchema as PersonaUpdateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaUpdateWithoutAssignmentPayoutsInput.schema';
import { PersonaUncheckedUpdateWithoutAssignmentPayoutsInputObjectSchema as PersonaUncheckedUpdateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaUncheckedUpdateWithoutAssignmentPayoutsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutAssignmentPayoutsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutAssignmentPayoutsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutAssignmentPayoutsInputObjectSchema).optional(),
  upsert: z.lazy(() => PersonaUpsertWithoutAssignmentPayoutsInputObjectSchema).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PersonaUpdateToOneWithWhereWithoutAssignmentPayoutsInputObjectSchema), z.lazy(() => PersonaUpdateWithoutAssignmentPayoutsInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutAssignmentPayoutsInputObjectSchema)]).optional()
}).strict();
export const PersonaUpdateOneRequiredWithoutAssignmentPayoutsNestedInputObjectSchema: z.ZodType<Prisma.PersonaUpdateOneRequiredWithoutAssignmentPayoutsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateOneRequiredWithoutAssignmentPayoutsNestedInput>;
export const PersonaUpdateOneRequiredWithoutAssignmentPayoutsNestedInputObjectZodSchema = makeSchema();
