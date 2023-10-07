FROM node:16-alpine AS base
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Build back app
FROM base AS back-build
COPY ./back ./
RUN npm install
RUN npm run build

# Release
FROM base AS release
COPY --from=back-build /usr/app/dist ./
COPY ./back/public ./public
COPY ./back/package.json ./
COPY ./back/package-lock.json ./
RUN npm ci --only=production

EXPOSE 80
ENV PORT=80
ENV NODE_ENV=production
ENV STATIC_FILES_PATH=./public
ENV API_MOCK=false
ENV CORS_ORIGIN=false
ENV AUTH_SECRET=MY_AUTH_SECRET
ENV S3_SIGNED_URL=true

ENTRYPOINT ["node", "index"]