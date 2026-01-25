import type {CoverageStatus, EngagementPriority, LifecycleStatus} from '@prisma/client';

const normalizeValue = (value?: string) => value?.trim().toLowerCase();

const matchValue =
    <T extends string>(value: string|undefined, options: readonly T[]) => {
      const normalized = normalizeValue(value);
      if (!normalized) return undefined;
      return options.find((option) => option.toLowerCase() === normalized);
    };

const lifecycleValues = Object.values(LifecycleStatus) as LifecycleStatus[];
const priorityValues =
    Object.values(EngagementPriority) as EngagementPriority[];
const coverageValues = Object.values(CoverageStatus) as CoverageStatus[];

export const parseLifecycleStatus = (value?: string) =>
    matchValue(value, lifecycleValues);
export const lifecycleStatusOrDefault =
    (value: string|undefined, fallback: LifecycleStatus) =>
        parseLifecycleStatus(value) ?? fallback;

export const parseEngagementPriority = (value?: string) =>
    matchValue(value, priorityValues);
export const engagementPriorityOrDefault =
    (value: string|undefined, fallback: EngagementPriority) =>
        parseEngagementPriority(value) ?? fallback;

export const parseCoverageStatus = (value?: string) =>
    matchValue(value, coverageValues);
export const coverageStatusOrDefault =
    (value: string|undefined, fallback: CoverageStatus) =>
        parseCoverageStatus(value) ?? fallback;
