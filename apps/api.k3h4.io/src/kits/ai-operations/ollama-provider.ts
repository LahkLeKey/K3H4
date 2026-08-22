export type OllamaMessage = {
  role: 'system'|'user'|'assistant';
  content: string;
};

export type OllamaChatRequest = {
  model: string;
  messages: OllamaMessage[];
  temperature?: number;
  stream: false;
};

export type OllamaChatResult = {
  content: string;
  requestBody: OllamaChatRequest;
  responseBody: unknown;
  statusCode: number;
};

export interface OllamaProvider {
  chat(request: OllamaChatRequest): Promise<OllamaChatResult>;
}

export class OllamaProviderError extends Error {
  constructor(
      message: string,
      readonly details: {
        requestBody: OllamaChatRequest;
        responseBody: unknown;
        statusCode: number|null;
      }) {
    super(message);
    this.name = 'OllamaProviderError';
  }
}

export function createOllamaProvider(options: {
  baseUrl: string;
  fetchImpl?: typeof fetch;
}): OllamaProvider {
  const baseUrl = options.baseUrl.trim().replace(/\/+$/, '');
  if (!baseUrl) throw new Error('OLLAMA_URL is required to reach the Ollama sidecar');
  const fetchImpl = options.fetchImpl ?? fetch;

  return {
    async chat(requestBody) {
      let responseBody: unknown = {};
      let statusCode: number|null = null;
      try {
        const response = await fetchImpl(`${baseUrl}/api/chat`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(requestBody),
        });
        statusCode = response.status;
        const textPayload = await response.text();
        responseBody = textPayload ? safeParseJson(textPayload) : {};
        if (!response.ok) {
          throw new OllamaProviderError(
              textPayload || `Ollama responded ${response.status}`,
              {requestBody, responseBody, statusCode});
        }
        return {
          content: extractAssistantContent(responseBody),
          requestBody,
          responseBody,
          statusCode,
        };
      } catch (error) {
        if (error instanceof OllamaProviderError) throw error;
        throw new OllamaProviderError(
            error instanceof Error ? error.message : 'Ollama request failed',
            {requestBody, responseBody, statusCode});
      }
    },
  };
}

function safeParseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function extractAssistantContent(payload: unknown): string {
  const record = payload as Record<string, unknown>;
  const choice = Array.isArray(record.choices) && record.choices.length ?
      record.choices[0] :
      payload;
  const assistant = (choice as Record<string, unknown>)?.message ?? choice;
  const flattened = flattenMessageContent(assistant);
  if (flattened) return flattened;
  throw new Error('Ollama returned an unexpected payload');
}

function flattenMessageContent(value: unknown): string|null {
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value))
    return value.map(flattenMessageContent).filter(Boolean).join('');
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const candidate =
        record.content ?? record.text ?? record.message ?? record.delta;
    if (candidate !== undefined) return flattenMessageContent(candidate);
    if (Array.isArray(record.choices) && record.choices.length)
      return flattenMessageContent(record.choices[0]);
  }
  return null;
}