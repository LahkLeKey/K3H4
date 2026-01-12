import fs from "node:fs/promises";
import path from "node:path";

// Lazy-loaded ONNX runtime to avoid startup cost when not needed.
let ort: any = null;
const sessionCache = new Map<string, any>();

const safeSigmoid = (value: number) => 1 / (1 + Math.exp(-Math.max(Math.min(value, 20), -20)));

export type CompatFeatureVector = {
  jaccardScore: number;
  intersectionCount: number;
  unionCount: number;
};

export type CompatOnnxResult = {
  probability: number;
  usedOnnx: boolean;
};

async function loadOrt() {
  if (ort) return ort;
  try {
    // Dynamic import keeps type resolution optional when the package is not installed yet.
    const moduleName = "onnxruntime-node";
    ort = await import(moduleName);
    return ort;
  } catch (err) {
    return null;
  }
}

async function getSession(modelPath: string) {
  const runtime = await loadOrt();
  if (!runtime) return null;
  const normalizedPath = path.resolve(modelPath);
  if (sessionCache.has(normalizedPath)) return sessionCache.get(normalizedPath) ?? null;

  try {
    await fs.access(normalizedPath);
    const session = await runtime.InferenceSession.create(normalizedPath);
    sessionCache.set(normalizedPath, session);
    return session;
  } catch (err) {
    sessionCache.set(normalizedPath, null as any);
    return null;
  }
}

function fallbackProbability(features: CompatFeatureVector) {
  const j = Number.isFinite(features.jaccardScore) ? features.jaccardScore : 0;
  const overlapRatio = features.unionCount > 0 ? features.intersectionCount / features.unionCount : 0;
  const linear = 4 * j + 1.2 * overlapRatio - 0.1;
  return safeSigmoid(linear);
}

export async function runOnnxCompatibility(features: CompatFeatureVector, modelPath?: string): Promise<CompatOnnxResult> {
  const chosenPath = modelPath || process.env.COMPAT_ONNX_MODEL_PATH || path.resolve(process.cwd(), "models", "persona_compat.onnx");
  const session = await getSession(chosenPath);
  if (!session) {
    return { probability: fallbackProbability(features), usedOnnx: false };
  }

  try {
    const runtime = await loadOrt();
    if (!runtime) throw new Error("onnx runtime missing");
    const input = runtime.Tensor.from([features.jaccardScore, features.intersectionCount, features.unionCount], [1, 3]);
    const outputMap = await session.run({ input });
    const firstKey = Object.keys(outputMap)[0];
    const values = outputMap[firstKey]?.data as Float32Array | Float64Array | number[] | undefined;
    const probability = Array.isArray(values) && values.length > 0 ? Number(values[0]) : fallbackProbability(features);
    const bounded = Number.isFinite(probability) ? Math.min(Math.max(probability, 0), 1) : fallbackProbability(features);
    return { probability: bounded, usedOnnx: true };
  } catch (err) {
    return { probability: fallbackProbability(features), usedOnnx: false };
  }
}
