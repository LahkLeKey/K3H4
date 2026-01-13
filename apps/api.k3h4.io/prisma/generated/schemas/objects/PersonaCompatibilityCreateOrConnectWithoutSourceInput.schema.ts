import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityCreateWithoutSourceInputObjectSchema as PersonaCompatibilityCreateWithoutSourceInputObjectSchema } from './PersonaCompatibilityCreateWithoutSourceInput.schema';
import { PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema as PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema } from './PersonaCompatibilityUncheckedCreateWithoutSourceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaCompatibilityCreateWithoutSourceInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema)])
}).strict();
export const PersonaCompatibilityCreateOrConnectWithoutSourceInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityCreateOrConnectWithoutSourceInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateOrConnectWithoutSourceInput>;
export const PersonaCompatibilityCreateOrConnectWithoutSourceInputObjectZodSchema = makeSchema();
