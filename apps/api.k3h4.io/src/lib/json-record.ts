import {Prisma} from '@prisma/client';

export type JsonRecord = Record<string, unknown>;

type StringOptions = {
  trim?: boolean;
  coerce?: boolean;
};

export const asRecord = (
    value: Prisma.JsonValue|null|undefined,
    ): JsonRecord => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as JsonRecord;
  }
  return {} as JsonRecord;
};

export const readString =
    (record: JsonRecord, key: string, options?: StringOptions) => {
      const value = record[key];
      if (typeof value === 'string') {
        return options?.trim ? value.trim() : value;
      }
      if (options?.coerce) {
        if (typeof value === 'number') return String(value);
        if (value != null) return String(value);
      }
      return null;
    };

export const readNumber = (record: JsonRecord, key: string) => {
  const value = record[key];
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

export const readStringArray = (record: JsonRecord, key: string) => {
  const value = record[key];
  if (Array.isArray(value)) {
    return value
        .map((entry) => {
          if (typeof entry === 'string') return entry.trim();
          if (typeof entry === 'number') return String(entry);
          return null;
        })
        .filter(
            (entry): entry is string =>
                typeof entry === 'string' && entry.length > 0);
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length ? [trimmed] : [];
  }
  return [] as string[];
};

export const toNumber = (value: unknown) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

export const toInputJsonValue = (value: unknown): Prisma.InputJsonValue =>
    JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;

export const toNullableInputJsonValue =
    (value: unknown): Prisma.InputJsonValue|Prisma.NullTypes.JsonNull => {
      if (value === null || value === undefined) return Prisma.JsonNull;
      return toInputJsonValue(value);
    };
