import type {PersonaRecord} from '../../entities/Persona/Persona';
import {LIFECYCLE_STATUSES, type LifecycleStatus} from '../../lib/domain-constants';

export type PersonaCompatibilityPayload = {
  sourceId: string;
  targetId: string;
  metadata: {
    sourceId: string;
    targetId: string;
    jaccardScore: number;
    intersectionCount: number;
    unionCount: number;
    overlappingTokens: string[];
    status: LifecycleStatus;
    rationale?: string|null;
  };
};

const normalizeToken = (value: string) =>
    value.trim().toLowerCase().replace(/\s+/g, '-');

const tokensForPersona = (persona: PersonaRecord) => {
  const tokens = new Set<string>();
  tokens.add(normalizeToken(persona.alias));
  if (persona.handle) tokens.add(normalizeToken(persona.handle));
  persona.tags.forEach((tag) => tokens.add(normalizeToken(tag)));
  persona.attributes.forEach((attribute) => {
    tokens.add(`${normalizeToken(attribute.category)}:${
        normalizeToken(attribute.value)}`);
  });
  return tokens;
};

const calculateJaccard = (left: Set<string>, right: Set<string>) => {
  const overlap = Array.from(left).filter((token) => right.has(token));
  const unionCount = new Set([...left, ...right]).size || 1;
  const intersectionCount = overlap.length;
  return {
    score: Number((intersectionCount / unionCount).toFixed(4)),
    intersectionCount,
    unionCount,
    overlap,
  };
};

export function buildPersonaCompatibilityPayload(
    personas: PersonaRecord[]): PersonaCompatibilityPayload[] {
  const payload: PersonaCompatibilityPayload[] = [];
  for (let leftIndex = 0; leftIndex < personas.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < personas.length;
         rightIndex += 1) {
      const left = personas[leftIndex];
      const right = personas[rightIndex];
      const {score, intersectionCount, unionCount, overlap} = calculateJaccard(
          tokensForPersona(left), tokensForPersona(right));
      payload.push({
        sourceId: left.id,
        targetId: right.id,
        metadata: {
          sourceId: left.id,
          targetId: right.id,
          jaccardScore: score,
          intersectionCount,
          unionCount,
          overlappingTokens: overlap,
          status: LIFECYCLE_STATUSES.ACTIVE,
        },
      });
    }
  }
  return payload;
}