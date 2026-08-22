import '../../test/vitest-setup';

import {describe, expect, it, vi} from 'vitest';

import {createOllamaProvider} from './ollama-provider';

describe('Ollama provider adapter', () => {
  it('sends non-streaming chat requests and returns transport details', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({message: {content: '  Ready.  '}}),
    });
    const provider = createOllamaProvider({
      baseUrl: 'http://ollama:11434/',
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    await expect(provider.chat({
      model: 'llama3.2:1b',
      messages: [{role: 'user', content: 'Hello'}],
      stream: false,
    })).resolves.toEqual({
      content: 'Ready.',
      requestBody: {
        model: 'llama3.2:1b',
        messages: [{role: 'user', content: 'Hello'}],
        stream: false,
      },
      responseBody: {message: {content: '  Ready.  '}},
      statusCode: 200,
    });
    expect(fetchImpl).toHaveBeenCalledWith('http://ollama:11434/api/chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        model: 'llama3.2:1b',
        messages: [{role: 'user', content: 'Hello'}],
        stream: false,
      }),
    });
  });
});