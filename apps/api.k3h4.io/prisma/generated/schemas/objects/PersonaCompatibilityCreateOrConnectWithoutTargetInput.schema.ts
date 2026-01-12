import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityCreateWithoutTargetInputObjectSchema as PersonaCompatibilityCreateWithoutTargetInputObjectSchema } from './PersonaCompatibilityCreateWithoutTargetInput.schema';
import { PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema as PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema } from './PersonaCompatibilityUncheckedCreateWithoutTargetInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaCompatibilityCreateWithoutTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutTargetInputObjectSchema)])
}).strict();
export const PersonaCompatibilityCreateOrConnectWithoutTargetInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityCreateOrConnectWithoutTargetInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateOrConnectWithoutTargetInput>;
export const PersonaCompatibilityCreateOrConnectWithoutTargetInputObjectZodSchema = makeSchema();
