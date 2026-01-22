import { type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";
import { swaggerTagMap } from "./swagger";

export function registerCoreHooks(server: FastifyInstance) {
  server.addHook("onRequest", async (request) => {
    request.requestStartTime = process.hrtime.bigint();
    request.log.info(
      {
        method: request.method,
        url: request.url,
        ip: request.ip,
        userAgent: request.headers["user-agent"],
      },
      "incoming request",
    );
  });

  server.addHook("onResponse", async (request, reply) => {
    const durationMs = request.requestStartTime
      ? Number((process.hrtime.bigint() - request.requestStartTime) / 1000000n)
      : undefined;

    request.log.info(
      {
        method: request.method,
        url: request.url,
        statusCode: reply.statusCode,
        durationMs,
        contentLength: reply.getHeader("content-length"),
      },
      "response sent",
    );
  });

  server.addHook("onError", async (request, reply, error) => {
    request.log.error(
      {
        err: error,
        method: request.method,
        url: request.url,
        statusCode: reply.statusCode,
      },
      "request error",
    );
  });

  server.addHook("onRoute", (routeOptions) => {
    const existing = routeOptions.schema?.tags;
    if (existing && Array.isArray(existing) && existing.length > 0) return;

    const firstSegment = routeOptions.url?.split("/").filter(Boolean)[0];
    const mapped = firstSegment ? swaggerTagMap[firstSegment] : undefined;
    const fallback = firstSegment ?? "general";
    const tagName = mapped?.name ?? fallback;
    routeOptions.schema = { ...(routeOptions.schema ?? {}), tags: [tagName] };
  });
}
