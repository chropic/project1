FROM node:25-alpine

WORKDIR /app
COPY --chown=node:node package.json server.js ./
USER node
ENV NODE_ENV=production PORT=19283 RATE_LIMIT=10
EXPOSE 19283
CMD ["node", "server.js"]
