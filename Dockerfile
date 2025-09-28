FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm db:generate

# Build the application
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
