package user

import (
	"education/model"
	"education/util"
	"testing"
)

func TestCheckAddParams(t *testing.T) {
	var user1 = model.User{
		Name:     "",
		Phone:    "",
		Password: "",
	}

	err := checkAddParams(&user1)
	if err.Error() != util.BuildErrorInfo("phone number is empty").Error() {
		t.Fatalf("fail test")
	}

	var user2 = model.User{
		Name:     "",
		Phone:    "123456789",
		Password: "",
	}
	if checkAddParams(&user2).Error() != util.BuildErrorInfo("password is empty").Error() {
		t.Fatalf("fail test")
	}

	var user3 = model.User{
		Name:     "",
		Phone:    "123456789",
		Password: "&*&*ksjdkfjk",
	}

	if checkAddParams(&user3).Error() != util.BuildErrorInfo("name is empty").Error() {
		t.Fatalf("fail test")
	}

	var user4 = model.User{
		Name:     "abc",
		Phone:    "123456789",
		Password: "&*&*ksjdkfjk",
	}

	if checkAddParams(&user4) != nil {
		t.Fatalf("fail test")
	}
}

func TestCheckParam(t *testing.T) {
	var user1 = model.User{
		Phone:    "123456789",
		Password: "&*&*ksjdkfjk",
	}

	if checkAddParams(user1) != nil {
		t.Fatalf("fail test")
	}

	var user2 = model.User{
		Phone:    "",
		Password: "&*&*ksjdkfjk",
	}

	if checkAddParams(user2).Error() != util.BuildErrorInfo("account cannot be empty").Error() {
		t.Fatalf("fail test")
	}

	var user3 = model.User{
		Phone:    "1231323",
		Password: "",
	}

	if checkAddParams(user3).Error() != util.BuildErrorInfo("password cannot be empty").Error() {
		t.Fatalf("fail test")
	}

}
