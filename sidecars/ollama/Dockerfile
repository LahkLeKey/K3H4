FROM ollama/ollama:latest
WORKDIR /root

ENV OLLAMA_MODEL_CACHE_DIR=/ollama/data
ENV OLLAMA_DATA_DIR=/root/.ollama

RUN mkdir -p /ollama/data

COPY preload-models.txt /etc/ollama/preload-models.txt
COPY entrypoint/preload-and-serve.sh /entrypoint/preload-and-serve.sh
RUN sed -i 's/\r$//' /entrypoint/preload-and-serve.sh
RUN chmod +x /entrypoint/preload-and-serve.sh

ENTRYPOINT ["/bin/bash", "/entrypoint/preload-and-serve.sh"]
CMD ["serve"]
