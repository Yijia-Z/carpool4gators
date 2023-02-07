package router

import (
	. "education/api/user"
	"github.com/gin-gonic/gin"
)

func InitRouter(router *gin.Engine) {
	exchange := router.Group("/user")
	{
		exchange.POST("/add_user", AddUserApi)
		exchange.POST("/delete_user", DeleteUserApi)
		exchange.POST("/update_user", UpdateUserApi)
		exchange.POST("/login", LoginApi)
	}

}
