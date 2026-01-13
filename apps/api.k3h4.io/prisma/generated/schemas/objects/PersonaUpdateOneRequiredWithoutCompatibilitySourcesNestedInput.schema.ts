import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutCompatibilitySourcesInputObjectSchema as PersonaCreateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaCreateWithoutCompatibilitySourcesInput.schema';
import { PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectSchema as PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaUncheckedCreateWithoutCompatibilitySourcesInput.schema';
import { PersonaCreateOrConnectWithoutCompatibilitySourcesInputObjectSchema as PersonaCreateOrConnectWithoutCompatibilitySourcesInputObjectSchema } from './PersonaCreateOrConnectWithoutCompatibilitySourcesInput.schema';
import { PersonaUpsertWithoutCompatibilitySourcesInputObjectSchema as PersonaUpsertWithoutCompatibilitySourcesInputObjectSchema } from './PersonaUpsertWithoutCompatibilitySourcesInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaUpdateToOneWithWhereWithoutCompatibilitySourcesInputObjectSchema as PersonaUpdateToOneWithWhereWithoutCompatibilitySourcesInputObjectSchema } from './PersonaUpdateToOneWithWhereWithoutCompatibilitySourcesInput.schema';
import { PersonaUpdateWithoutCompatibilitySourcesInputObjectSchema as PersonaUpdateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaUpdateWithoutCompatibilitySourcesInput.schema';
import { PersonaUncheckedUpdateWithoutCompatibilitySourcesInputObjectSchema as PersonaUncheckedUpdateWithoutCompatibilitySourcesInputObjectSchema } from './PersonaUncheckedUpdateWithoutCompatibilitySourcesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutCompatibilitySourcesInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutCompatibilitySourcesInputObjectSchema).optional(),
  upsert: z.lazy(() => PersonaUpsertWithoutCompatibilitySourcesInputObjectSchema).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PersonaUpdateToOneWithWhereWithoutCompatibilitySourcesInputObjectSchema), z.lazy(() => PersonaUpdateWithoutCompatibilitySourcesInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutCompatibilitySourcesInputObjectSchema)]).optional()
}).strict();
export const PersonaUpdateOneRequiredWithoutCompatibilitySourcesNestedInputObjectSchema: z.ZodType<Prisma.PersonaUpdateOneRequiredWithoutCompatibilitySourcesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateOneRequiredWithoutCompatibilitySourcesNestedInput>;
export const PersonaUpdateOneRequiredWithoutCompatibilitySourcesNestedInputObjectZodSchema = makeSchema();
