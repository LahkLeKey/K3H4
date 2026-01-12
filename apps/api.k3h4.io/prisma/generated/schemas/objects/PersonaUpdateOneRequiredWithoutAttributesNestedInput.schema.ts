import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutAttributesInputObjectSchema as PersonaCreateWithoutAttributesInputObjectSchema } from './PersonaCreateWithoutAttributesInput.schema';
import { PersonaUncheckedCreateWithoutAttributesInputObjectSchema as PersonaUncheckedCreateWithoutAttributesInputObjectSchema } from './PersonaUncheckedCreateWithoutAttributesInput.schema';
import { PersonaCreateOrConnectWithoutAttributesInputObjectSchema as PersonaCreateOrConnectWithoutAttributesInputObjectSchema } from './PersonaCreateOrConnectWithoutAttributesInput.schema';
import { PersonaUpsertWithoutAttributesInputObjectSchema as PersonaUpsertWithoutAttributesInputObjectSchema } from './PersonaUpsertWithoutAttributesInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaUpdateToOneWithWhereWithoutAttributesInputObjectSchema as PersonaUpdateToOneWithWhereWithoutAttributesInputObjectSchema } from './PersonaUpdateToOneWithWhereWithoutAttributesInput.schema';
import { PersonaUpdateWithoutAttributesInputObjectSchema as PersonaUpdateWithoutAttributesInputObjectSchema } from './PersonaUpdateWithoutAttributesInput.schema';
import { PersonaUncheckedUpdateWithoutAttributesInputObjectSchema as PersonaUncheckedUpdateWithoutAttributesInputObjectSchema } from './PersonaUncheckedUpdateWithoutAttributesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutAttributesInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutAttributesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutAttributesInputObjectSchema).optional(),
  upsert: z.lazy(() => PersonaUpsertWithoutAttributesInputObjectSchema).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PersonaUpdateToOneWithWhereWithoutAttributesInputObjectSchema), z.lazy(() => PersonaUpdateWithoutAttributesInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutAttributesInputObjectSchema)]).optional()
}).strict();
export const PersonaUpdateOneRequiredWithoutAttributesNestedInputObjectSchema: z.ZodType<Prisma.PersonaUpdateOneRequiredWithoutAttributesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateOneRequiredWithoutAttributesNestedInput>;
export const PersonaUpdateOneRequiredWithoutAttributesNestedInputObjectZodSchema = makeSchema();
