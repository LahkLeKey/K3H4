FROM ollama/ollama:latest
WORKDIR /root

COPY preload-models.txt /etc/ollama/preload-models.txt
COPY entrypoint/preload-and-serve.sh /entrypoint/preload-and-serve.sh
RUN chmod +x /entrypoint/preload-and-serve.sh

ENTRYPOINT ["/bin/sh", "/entrypoint/preload-and-serve.sh"]
CMD ["serve"]
