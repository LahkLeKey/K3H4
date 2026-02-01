import {type FastifyInstance, type FastifyReply, type FastifyRequest} from 'fastify';

import {swaggerTagMap} from './swagger';

export function registerCoreHooks(server: FastifyInstance) {
  server.addHook('onRequest', async (request) => {
    request.requestStartTime = process.hrtime.bigint();
    request.log.info(
        {
          method: request.method,
          url: request.url,
          ip: request.ip,
          userAgent: request.headers['user-agent'],
        },
        'incoming request',
    );
  });

  server.addHook('onResponse', async (request, reply) => {
    const durationMs = request.requestStartTime ?
        Number(
            (process.hrtime.bigint() - request.requestStartTime) / 1000000n) :
        undefined;

    request.log.info(
        {
          method: request.method,
          url: request.url,
          statusCode: reply.statusCode,
          durationMs,
          contentLength: reply.getHeader('content-length'),
        },
        'response sent',
    );
  });

  server.addHook('onError', async (request, reply, error) => {
    request.log.error(
        {
          err: error,
          method: request.method,
          url: request.url,
          statusCode: reply.statusCode,
        },
        'request error',
    );
  });

  server.addHook('onRoute', (routeOptions) => {
    const existing = routeOptions.schema?.tags;
    if (existing && Array.isArray(existing) && existing.length > 0) {
      const normalized = existing.map((tag) => {
        const key = typeof tag === 'string' ? tag.trim() : String(tag);
        const mapped = swaggerTagMap[key] ?? swaggerTagMap[key.toLowerCase()];
        return mapped?.name ?? key;
      });
      routeOptions.schema = {
        ...(routeOptions.schema ?? {}),
        tags: normalized,
      };
    }

    const schema = routeOptions.schema ?? {};
    const url = routeOptions.url ?? '';
    const method = Array.isArray(routeOptions.method) ?
        routeOptions.method[0] :
        routeOptions.method ?? 'GET';

    const segments = url.split('/').filter(Boolean);
    const firstSegment = segments[0];
    const secondSegment = segments[1];
    const tagKey =
        firstSegment && ['entity', 'user', 'actor'].includes(firstSegment) ?
        secondSegment ?? firstSegment :
        firstSegment;
    const mapped = tagKey ? swaggerTagMap[tagKey] : undefined;
    const fallback = tagKey ?? 'general';
    const tagName = mapped?.name ?? fallback;

    const hasTags = Array.isArray(schema.tags) && schema.tags.length > 0;
    const tags = hasTags ? schema.tags : [tagName];

    const summary = schema.summary ?? `${method} ${url}`;
    const operationId =
        schema.operationId ??
        `${String(method).toLowerCase()}_${
            segments
                .map(
                    (segment) => segment.replace(/^:/, 'by_')
                                     .replace(/[^a-zA-Z0-9]/g, '_'))
                .join('_')}`;

    const paramsInPath = segments.filter((segment) => segment.startsWith(':'))
                             .map((segment) => segment.replace(/^:/, ''));
    const paramsSchema =
        schema.params ??
        (paramsInPath.length ? {
          type: 'object',
          properties: Object.fromEntries(paramsInPath.map(
              (param) =>
                  [param.replace(/\?$/, ''),
                   {type: 'string', description: 'Path parameter'},
    ])),
          required: paramsInPath.filter((param) => !param.endsWith('?'))
                        .map((param) => param.replace(/\?$/, '')),
        } :
                               undefined);

    routeOptions.schema = {
      ...schema,
      tags,
      summary,
      description: schema.description ?? 'Auto-generated summary',
      operationId,
      ...(paramsSchema ? {params: paramsSchema} : {}),
    };
  });
}
