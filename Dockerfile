FROM node:8.11.3

RUN apt-get update -qq && apt-get install -y curl apt-transport-https

# postgresql-client
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ jessie-pgdg main" > /etc/apt/sources.list.d/pgdg.list' && \
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update -qq && \
  apt-get -y install build-essential postgresql-client-9.5 yarn

RUN mkdir /app
WORKDIR /app
ADD . /app

RUN yarn install

EXPOSE 8080
