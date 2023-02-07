#!/user/bin/env bash
RUN_NAME="education"

mkdir -p output/bin output/bin/conf
cp -R conf/* output/bin/conf

# linux 环境
set CGO_ENABLED=0
set GOARCH=amd64
set GOOS=linux

go build -o output/bin/${RUN_NAME}