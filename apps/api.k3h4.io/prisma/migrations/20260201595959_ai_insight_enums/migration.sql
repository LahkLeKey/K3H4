-- Add AI insight enum values so that subsequent migrations can safely use them.

ALTER TYPE "ActorType" ADD VALUE 'ai-insight';
ALTER TYPE "EntityKind" ADD VALUE 'ai_insight';
