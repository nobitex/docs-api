.PHONY: clean build serve

all: build

build:
	bundle exec middleman build

serve:
	bundle exec middleman server

clean:
	rm -rf build
