SRC = $(wildcard *.go)
GITVISION = `git describe`"-"`git rev-parse --short HEAD`

all:education
education:$(SRC)
	go build -x -ldflags "-w -s -X main.BuildVersion=$(GITVISION)" -o education $^

arm:
	GOARM=7 GOARCH=arm64 GOOS=linux go build -x -ldflags "-w -s -X main.BuildVersion=$(GITVISION)" -o education $^

clean:
	rm -rvf education
