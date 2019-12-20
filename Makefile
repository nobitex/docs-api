.PHONY: clean build

clean:
	rm -rf build

build:
	bundle exec middleman build
serve:
	python3 -m http.server --bind 127.0.0.1 --directory build 4001
