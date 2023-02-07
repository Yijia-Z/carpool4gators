package util

import (
	uuid "github.com/satori/go.uuid"
	"strings"
)

//生成uuid      32位
func GetUUID() string {
	uuId := uuid.NewV4()
	sep := "-"
	s := strings.Split(uuId.String(), sep)
	var result string
	for i := 0; i < len(s); i++ {
		result += s[i]
	}
	return result
}
