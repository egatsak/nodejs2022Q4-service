# Image source
FROM node:18-alpine

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /app/

# Then install the NPM module
RUN npm install

# Copy current directory to APP folder
COPY . /app/

EXPOSE ${PORT}

VOLUME ["/app/data"]

CMD ["npm", "run", "start:dev"]