import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaCreateWithoutAttributesInputObjectSchema as PersonaCreateWithoutAttributesInputObjectSchema } from './PersonaCreateWithoutAttributesInput.schema';
import { PersonaUncheckedCreateWithoutAttributesInputObjectSchema as PersonaUncheckedCreateWithoutAttributesInputObjectSchema } from './PersonaUncheckedCreateWithoutAttributesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaCreateWithoutAttributesInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutAttributesInputObjectSchema)])
}).strict();
export const PersonaCreateOrConnectWithoutAttributesInputObjectSchema: z.ZodType<Prisma.PersonaCreateOrConnectWithoutAttributesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateOrConnectWithoutAttributesInput>;
export const PersonaCreateOrConnectWithoutAttributesInputObjectZodSchema = makeSchema();
