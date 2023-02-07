package user

import (
	"education/common"
	errno "education/common/erron"
	"education/database"
	"education/model"
	"education/model/model_overview"
	"github.com/gin-gonic/gin"
	"log"
)

// 添加用户
func DeleteUserApi(c *gin.Context) {
	var user model_overview.DeleteUserReq
	err := c.ShouldBindJSON(&user)
	if err != nil {
		log.Printf("ShouldBindJSON user failed, err:%v\n", err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}
	err = deleteUser(c, user.Ids, user.Phones)
	if err != nil {
		log.Printf("delete failed, user:%v, err:%v\n", user, err)
		common.SendResponse(c, errno.DeleteErr, err.Error())
		return
	}
	common.SendResponse(c, errno.OK, nil)
}

func deleteUser(c *gin.Context, ids, phones []string) error {
	userDb := database.Query.User
	sql := userDb.WithContext(c)
	if len(ids) > 0 {
		sql = sql.Where(userDb.ID.In(ids...))
	}
	if len(phones) > 0 {
		sql = sql.Where(userDb.Phone.In(phones...))
	}
	_, err := sql.Delete(&model.User{})
	if err != nil {
		log.Printf("userDb delete user failed,err:%v\n", err)
		return err
	}
	return nil
}
