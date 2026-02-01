export const LIFECYCLE_STATUSES = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  PENDING: 'PENDING',
  PLANNING: 'PLANNING',
  COMPLETED: 'COMPLETED',
  STORED: 'STORED',
  IDLE: 'IDLE',
  SCHEDULED: 'SCHEDULED',
  UNFILLED: 'UNFILLED',
} as const;

export type LifecycleStatus =
    typeof LIFECYCLE_STATUSES[keyof typeof LIFECYCLE_STATUSES];

export const ENGAGEMENT_PRIORITIES = {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const;

export type EngagementPriority =
    typeof ENGAGEMENT_PRIORITIES[keyof typeof ENGAGEMENT_PRIORITIES];

export const COVERAGE_STATUSES = {
  UNFILLED: 'UNFILLED',
  FILLED: 'FILLED',
  PARTIAL: 'PARTIAL',
} as const;

export type CoverageStatus =
    typeof COVERAGE_STATUSES[keyof typeof COVERAGE_STATUSES];

export const WAREHOUSE_CATEGORIES = {
  AGRICULTURE: 'AGRICULTURE',
  OTHER: 'OTHER',
} as const;

export type WarehouseCategory =
    typeof WAREHOUSE_CATEGORIES[keyof typeof WAREHOUSE_CATEGORIES];

export const CHAT_ROLES = {
  SYSTEM: 'SYSTEM',
  USER: 'USER',
  ASSISTANT: 'ASSISTANT',
} as const;

export type ChatRole = typeof CHAT_ROLES[keyof typeof CHAT_ROLES];

export const BUILDING_TYPES = {
  RESIDENTIAL: 'RESIDENTIAL',
  COMMERCIAL: 'COMMERCIAL',
  INDUSTRIAL: 'INDUSTRIAL',
} as const;

export type BuildingType = typeof BUILDING_TYPES[keyof typeof BUILDING_TYPES];
