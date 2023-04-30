FROM --platform=linux/arm64 node:16.14

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install\
        && npm install typescript -g

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

RUN tsc

EXPOSE 3000
CMD [ "node", "build/index.js" ]
