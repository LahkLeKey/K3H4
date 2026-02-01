import {type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';
import {readdir} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

import {type RecordTelemetryFn} from './types';

type Registrar =
    (server: FastifyInstance, prisma: PrismaClient,
     recordTelemetry: RecordTelemetryFn) => void|Promise<void>;

const PRIORITY: Record<string, number> = {
  auth: 0,
};

const DEFAULT_PREFIX = '/entity';
const ROUTE_PREFIX: Record<string, string> = {
  auth: '/user',
  profile: '/user',
  actorentity: '',
};

const isRouteFile = (name: string) => {
  return name.endsWith('.ts') || name.endsWith('.js') ||
      name.endsWith('.mjs') || name.endsWith('.mts');
};

export async function registerAllRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  const routesDir = path.dirname(new URL(import.meta.url).pathname);
  const entries = await readdir(routesDir, {withFileTypes: true});

  const registrars: Array<{name: string; fn: Registrar; weight: number}> = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!isRouteFile(entry.name)) continue;
    if (entry.name.startsWith('index')) continue;  // avoid self-import
    if (entry.name.startsWith('types')) continue;

    const filePath = path.join(routesDir, entry.name);
    const mod =
        (await import(pathToFileURL(filePath).href)) as Record<string, unknown>;
    const candidates = Object.entries(mod).filter(
        ([key, val]) => typeof val === 'function' &&
            key.startsWith('register') && key.endsWith('Routes'));

    for (const [key, fn] of candidates) {
      const base =
          key.replace(/^register/i, '').replace(/Routes$/i, '').toLowerCase();
      const weight = PRIORITY[base] ?? 1000;
      registrars.push({name: base || entry.name, fn: fn as Registrar, weight});
    }
  }

  registrars.sort(
      (a, b) => a.weight - b.weight || a.name.localeCompare(b.name));

  for (const registrar of registrars) {
    const prefix =
        Object.prototype.hasOwnProperty.call(ROUTE_PREFIX, registrar.name) ?
        ROUTE_PREFIX[registrar.name] :
        DEFAULT_PREFIX;
    if (prefix) {
      await server.register(
          async (scoped) => registrar.fn(scoped, prisma, recordTelemetry),
          {prefix});
    } else {
      await registrar.fn(server, prisma, recordTelemetry);
    }
  }
}
