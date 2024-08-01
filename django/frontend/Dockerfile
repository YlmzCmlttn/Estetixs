FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install
COPY . .
RUN npx next telemetry disable
CMD ["npm","run", "dev"]