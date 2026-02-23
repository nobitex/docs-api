FROM ruby:3.3.8-slim

ENV BUNDLE_DEPLOYMENT=true \
    BUNDLE_PATH=vendor/bundle \
    BUNDLE_JOBS=4 \
    BUNDLE_RETRY=3

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    nodejs \
    awscli \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install

COPY . .

RUN bundle exec middleman build
