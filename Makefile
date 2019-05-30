.PHONY: clean build

clean:
	rm -rf build

build:
	bundle exec middleman build
