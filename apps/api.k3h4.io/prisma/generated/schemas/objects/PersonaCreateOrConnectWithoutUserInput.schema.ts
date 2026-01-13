import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaCreateWithoutUserInputObjectSchema as PersonaCreateWithoutUserInputObjectSchema } from './PersonaCreateWithoutUserInput.schema';
import { PersonaUncheckedCreateWithoutUserInputObjectSchema as PersonaUncheckedCreateWithoutUserInputObjectSchema } from './PersonaUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PersonaCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateOrConnectWithoutUserInput>;
export const PersonaCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
