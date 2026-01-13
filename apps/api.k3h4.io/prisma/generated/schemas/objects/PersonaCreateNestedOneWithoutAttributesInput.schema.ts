import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutAttributesInputObjectSchema as PersonaCreateWithoutAttributesInputObjectSchema } from './PersonaCreateWithoutAttributesInput.schema';
import { PersonaUncheckedCreateWithoutAttributesInputObjectSchema as PersonaUncheckedCreateWithoutAttributesInputObjectSchema } from './PersonaUncheckedCreateWithoutAttributesInput.schema';
import { PersonaCreateOrConnectWithoutAttributesInputObjectSchema as PersonaCreateOrConnectWithoutAttributesInputObjectSchema } from './PersonaCreateOrConnectWithoutAttributesInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutAttributesInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutAttributesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutAttributesInputObjectSchema).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional()
}).strict();
export const PersonaCreateNestedOneWithoutAttributesInputObjectSchema: z.ZodType<Prisma.PersonaCreateNestedOneWithoutAttributesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateNestedOneWithoutAttributesInput>;
export const PersonaCreateNestedOneWithoutAttributesInputObjectZodSchema = makeSchema();
