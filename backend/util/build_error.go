package util

import (
	"errors"
	"fmt"
)

func BuildErrorInfo(format string, args ...interface{}) error {
	return errors.New(fmt.Sprintf(format, args...))
}
