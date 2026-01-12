import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityCreateWithoutSourceInputObjectSchema as PersonaCompatibilityCreateWithoutSourceInputObjectSchema } from './PersonaCompatibilityCreateWithoutSourceInput.schema';
import { PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema as PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema } from './PersonaCompatibilityUncheckedCreateWithoutSourceInput.schema';
import { PersonaCompatibilityCreateOrConnectWithoutSourceInputObjectSchema as PersonaCompatibilityCreateOrConnectWithoutSourceInputObjectSchema } from './PersonaCompatibilityCreateOrConnectWithoutSourceInput.schema';
import { PersonaCompatibilityCreateManySourceInputEnvelopeObjectSchema as PersonaCompatibilityCreateManySourceInputEnvelopeObjectSchema } from './PersonaCompatibilityCreateManySourceInputEnvelope.schema';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCompatibilityCreateWithoutSourceInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateWithoutSourceInputObjectSchema).array(), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutSourceInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PersonaCompatibilityCreateOrConnectWithoutSourceInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateOrConnectWithoutSourceInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PersonaCompatibilityCreateManySourceInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PersonaCompatibilityCreateNestedManyWithoutSourceInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityCreateNestedManyWithoutSourceInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateNestedManyWithoutSourceInput>;
export const PersonaCompatibilityCreateNestedManyWithoutSourceInputObjectZodSchema = makeSchema();
