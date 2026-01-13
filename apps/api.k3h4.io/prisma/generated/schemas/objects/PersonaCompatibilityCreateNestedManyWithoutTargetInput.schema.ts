import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityCreateWithoutTargetInputObjectSchema as PersonaCompatibilityCreateWithoutTargetInputObjectSchema } from './PersonaCompatibilityCreateWithoutTargetInput.schema';
import { PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema as PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema } from './PersonaCompatibilityUncheckedCreateWithoutTargetInput.schema';
import { PersonaCompatibilityCreateOrConnectWithoutTargetInputObjectSchema as PersonaCompatibilityCreateOrConnectWithoutTargetInputObjectSchema } from './PersonaCompatibilityCreateOrConnectWithoutTargetInput.schema';
import { PersonaCompatibilityCreateManyTargetInputEnvelopeObjectSchema as PersonaCompatibilityCreateManyTargetInputEnvelopeObjectSchema } from './PersonaCompatibilityCreateManyTargetInputEnvelope.schema';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCompatibilityCreateWithoutTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateWithoutTargetInputObjectSchema).array(), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PersonaCompatibilityCreateOrConnectWithoutTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateOrConnectWithoutTargetInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PersonaCompatibilityCreateManyTargetInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PersonaCompatibilityCreateNestedManyWithoutTargetInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityCreateNestedManyWithoutTargetInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateNestedManyWithoutTargetInput>;
export const PersonaCompatibilityCreateNestedManyWithoutTargetInputObjectZodSchema = makeSchema();
