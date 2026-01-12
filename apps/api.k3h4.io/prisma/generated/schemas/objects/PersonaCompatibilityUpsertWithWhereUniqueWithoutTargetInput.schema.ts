import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityUpdateWithoutTargetInputObjectSchema as PersonaCompatibilityUpdateWithoutTargetInputObjectSchema } from './PersonaCompatibilityUpdateWithoutTargetInput.schema';
import { PersonaCompatibilityUncheckedUpdateWithoutTargetInputObjectSchema as PersonaCompatibilityUncheckedUpdateWithoutTargetInputObjectSchema } from './PersonaCompatibilityUncheckedUpdateWithoutTargetInput.schema';
import { PersonaCompatibilityCreateWithoutTargetInputObjectSchema as PersonaCompatibilityCreateWithoutTargetInputObjectSchema } from './PersonaCompatibilityCreateWithoutTargetInput.schema';
import { PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema as PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema } from './PersonaCompatibilityUncheckedCreateWithoutTargetInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PersonaCompatibilityUpdateWithoutTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedUpdateWithoutTargetInputObjectSchema)]),
  create: z.union([z.lazy(() => PersonaCompatibilityCreateWithoutTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema)])
}).strict();
export const PersonaCompatibilityUpsertWithWhereUniqueWithoutTargetInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUpsertWithWhereUniqueWithoutTargetInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpsertWithWhereUniqueWithoutTargetInput>;
export const PersonaCompatibilityUpsertWithWhereUniqueWithoutTargetInputObjectZodSchema = makeSchema();
