
FROM node:16-alpine3.15 as dev




RUN mkdir brand-meal
# Docker working directory
WORKDIR /brand-meal


COPY . /brand-meal/
# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /brand-meal/

# Then install the NPM module
RUN npm install

# Copy current directory to APP folder


COPY . .

EXPOSE 80
CMD ["npm", "run", "start"]


