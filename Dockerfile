# Stage 1: Base image.
## Start with a base image containing NodeJS so we can build Docusaurus.
FROM node:lts-alpine AS base
## Disable colour output from yarn to make logs easier to read.
ENV FORCE_COLOR=0
## Enable corepack.
RUN corepack enable
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus

# Stage 2: Production build mode.
FROM base AS prod
## Install git (needed for CI/CD).
RUN apk add --no-cache git
## Copy only package files first
COPY package.json package-lock.json ./
## Install dependencies.
RUN npm ci
## Copy over the source code.
COPY . .

# Initialize git repo (needed for CI/CD)
RUN git config --global user.email "adreas@karabetian.gr" && \
    git config --global user.name "adreaskar" && \
    git init && \
    git commit --allow-empty -m "Trigger build"

## Build the static site.
RUN npm run build

# Stage 3: Serve with `docusaurus serve`.
FROM prod AS serve
## Expose the port that Docusaurus will run on.
EXPOSE 3000
## Run the production server.
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--no-open"]