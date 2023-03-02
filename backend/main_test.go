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

	data := `{"name":"mike","phone":"323","password":"123"}`
	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/user/add_user", reqbody)
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

func TestAddUserApi1(t *testing.T) {
	g := gin.Default()
	router.InitRouter(g)

	data := `{"name":"mike","phone":"323","password":"123}` //wrong params
	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/user/add_user", reqbody)
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

	data := `{"phone":"323","password":"123"}`
	reqbody := strings.NewReader(data)
	req, err := http.NewRequest(http.MethodPost, "/user/login", reqbody)
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
	req, err := http.NewRequest(http.MethodPost, "/user/login", reqbody)
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
