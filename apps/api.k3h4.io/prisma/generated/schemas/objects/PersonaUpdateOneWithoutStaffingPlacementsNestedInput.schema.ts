import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutStaffingPlacementsInputObjectSchema as PersonaCreateWithoutStaffingPlacementsInputObjectSchema } from './PersonaCreateWithoutStaffingPlacementsInput.schema';
import { PersonaUncheckedCreateWithoutStaffingPlacementsInputObjectSchema as PersonaUncheckedCreateWithoutStaffingPlacementsInputObjectSchema } from './PersonaUncheckedCreateWithoutStaffingPlacementsInput.schema';
import { PersonaCreateOrConnectWithoutStaffingPlacementsInputObjectSchema as PersonaCreateOrConnectWithoutStaffingPlacementsInputObjectSchema } from './PersonaCreateOrConnectWithoutStaffingPlacementsInput.schema';
import { PersonaUpsertWithoutStaffingPlacementsInputObjectSchema as PersonaUpsertWithoutStaffingPlacementsInputObjectSchema } from './PersonaUpsertWithoutStaffingPlacementsInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaUpdateToOneWithWhereWithoutStaffingPlacementsInputObjectSchema as PersonaUpdateToOneWithWhereWithoutStaffingPlacementsInputObjectSchema } from './PersonaUpdateToOneWithWhereWithoutStaffingPlacementsInput.schema';
import { PersonaUpdateWithoutStaffingPlacementsInputObjectSchema as PersonaUpdateWithoutStaffingPlacementsInputObjectSchema } from './PersonaUpdateWithoutStaffingPlacementsInput.schema';
import { PersonaUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema as PersonaUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema } from './PersonaUncheckedUpdateWithoutStaffingPlacementsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutStaffingPlacementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutStaffingPlacementsInputObjectSchema).optional(),
  upsert: z.lazy(() => PersonaUpsertWithoutStaffingPlacementsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => PersonaWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => PersonaWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PersonaUpdateToOneWithWhereWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => PersonaUpdateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema)]).optional()
}).strict();
export const PersonaUpdateOneWithoutStaffingPlacementsNestedInputObjectSchema: z.ZodType<Prisma.PersonaUpdateOneWithoutStaffingPlacementsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateOneWithoutStaffingPlacementsNestedInput>;
export const PersonaUpdateOneWithoutStaffingPlacementsNestedInputObjectZodSchema = makeSchema();
