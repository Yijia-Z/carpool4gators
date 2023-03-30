package main

import (
	"education/router"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
)

// go test -v -run TestAddUserApi

func TestAddUserApi(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{"name":"mike","phone":"32333223","password":"12356"}`
	// reqbody := strings.NewReader(data)
	req, err := http.NewRequest("POST", "/api/user/add_user", strings.NewReader(data))
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)

	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if result.StatusCode != 200 {
		t.Fatalf("resp code error.")
	}

}

func TestWrongAddUserApi(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{"name":"mike","phone":"323","password":"123}` //wrong params
	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/api/user/add_user", reqbody)
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)

	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if result.StatusCode != 200 {
		t.Fatalf("resp code error.")
	}

	if rec.Body.String() != `{"code":10003,"message":"参数有误","data":"unexpected EOF"}` {
		t.Fatalf("response not expected")
	}

}
func TestLoginApi(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{"phone":"187963968699","password":"123456"}`
	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/api/user/login", reqbody)
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)

	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if result.StatusCode != 200 {
		t.Fatalf("resp code error.")
	}
}

func TestLoginApi1(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{"phone":"323","password":"123}`
	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/api/user/login", reqbody)
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)

	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if result.StatusCode != 200 {
		t.Fatalf("resp code error.")
	}

	if rec.Body.String() != `{"code":10003,"message":"参数有误","data":"unexpected EOF"}` {
		t.Fatalf("response not expected")
	}

}

func TestUpdateUserApi(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{"id":"f68f7efabd2946dcb368b1bd06c6ee8c","phone":"323","password":"123"}`
	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/api/user/update_user", reqbody)
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)
	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if result.StatusCode != 200 {
		t.Fatalf("resp code error.")
	}
}

func TestUpdateUserApi1(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{"id":"","phone":"323","password":"123}`
	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/api/user/update_user", reqbody)
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)
	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if result.StatusCode != 200 {
		t.Fatalf("resp code error.")
	}

	if rec.Body.String() != `{"code":10003,"message":"参数有误","data":"unexpected EOF"}` {
		t.Fatalf("response not expected")
	}
}

func TestDeleteUserApi(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{"ids":[],"phones":["323"]}`
	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/api/user/delete_user", reqbody)
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)
	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if result.StatusCode != 200 {
		t.Fatalf("resp code error.")
	}
}

func TestDeleteUserApi1(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{"ids":[],"phones":["323]}`
	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/api/user/delete_user", reqbody)
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)
	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if result.StatusCode != 200 {
		t.Fatalf("resp code error.")
	}

	if rec.Body.String() != `{"code":10003,"message":"参数有误","data":"unexpected EOF"}` {
		t.Fatalf("response not expected")
	}

}

func TestAddDriverApi(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{
		"username":"hxt",
		"password":"123456",
		"email":"kkhxt@foxmail.com",
		"phone":"1566948102891"
	}`

	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/api/driver/register", reqbody)
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)

	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if result.StatusCode != 200 {
		t.Fatalf("resp code error.")
	}

}

func TestAddDriverApi1(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{
		"username":"",
		"password":"123456",
		"email":"kkhxt@foxmail.com",
		"phone":"1566948102891"
	}`

	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/api/driver/register", reqbody)
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)

	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if rec.Body.String() != `{"code":10003,"message":"参数有误","data":"用户名为空"}` {
		t.Fatalf("response not expected")
	}
}

func TestDriverLoginApi(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{
		"phone":"156694810289",
		"password":"123456"
	}`

	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/api/driver/login", reqbody)
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)

	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if result.StatusCode != 200 {
		t.Fatalf("resp code error.")
	}

}

/*
func TestDriverLoginApi1(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{
		"phone":"156694810289",
		"password":"1234567"
	}`

	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/api/driver/login", reqbody)
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)

	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if rec.Body.String() != `{"code":10003,"message":"参数有误","data":"密码错误"}` {
		t.Fatalf("response not expected")
	}

}
*/

func TestDriverUpdateApi(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{
		"driver_id":373954758,
		"username":"john"
	}`

	reqbody := strings.NewReader(data)
	req, err := http.NewRequest("PUT", "/api/driver/373954758", reqbody)
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)

	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if result.StatusCode != 200 {
		t.Fatalf("resp code error.")
	}

}

func TestDriverUpdateApi1(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{
		"username":"john"
	}`

	reqbody := strings.NewReader(data)
	req, err := http.NewRequest("PUT", "/api/driver/373954758", reqbody)
	if err != nil {
		t.Fatalf("new request fail, err: %v", err)
	}

	rec := httptest.NewRecorder()

	g.ServeHTTP(rec, req)

	result := rec.Result()
	t.Logf("response code: %v", result.StatusCode)
	t.Logf("response str: %s ", rec.Body.String())

	if rec.Body.String() != `{"code":10002,"message":"缺少参数","data":"DriverID为空"}` {
		t.Fatalf("response not expected")
	}

}
