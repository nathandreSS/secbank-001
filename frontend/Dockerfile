FROM node:16

WORKDIR /app

COPY build ./build

RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
