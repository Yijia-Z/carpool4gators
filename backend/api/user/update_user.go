package user

import (
	"education/common"
	errno "education/common/erron"
	"education/database"
	"education/model"
	"education/util"
	"github.com/gin-gonic/gin"
	"log"
	"time"
)

func UpdateUserApi(c *gin.Context) {
	var req model.User
	err := c.ShouldBindJSON(&req)
	if err != nil {
		log.Printf("ShouldBindJSON user failed, err:%v\n", err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}
	if err = checkUpdateParam(req); err != nil {
		log.Printf("checkParam failed, req:%v, err:%v\n", req, err)
		common.SendResponse(c, errno.NoParams, err.Error())
		return
	}
	oldUser, err := getUserById(c, req.ID)
	if err != nil {
		log.Printf("getUserById failed, req:%v, err:%v\n", req, err)
		common.SendResponse(c, errno.OperationErr, err.Error())
		return
	}
	user, err := updateUser(c, oldUser, &req)
	if err != nil {
		log.Printf("updateUser failed, req:%v, err:%v\n", req, err)
		common.SendResponse(c, errno.OperationErr, err.Error())
		return
	}
	common.SendResponse(c, errno.OK, user)
}

func checkUpdateParam(user model.User) error {
	if user.ID == "" {
		return util.BuildErrorInfo("ID为空")
	}
	return nil
}

func updateUser(c *gin.Context, user *model.User, req *model.User) (*model.User, error) {
	if req.Name != "" {
		user.Name = req.Name
	}
	if req.Password != "" {
		user.Password = req.Password
	}
	user.UpdateTime = time.Now().Unix()
	userDb := database.Query.User
	err := userDb.WithContext(c).Save(user)
	if err != nil {
		log.Printf("monsterDb save failed, user:%v, req:%v, err:%v", user, req, err)
		return nil, util.BuildErrorInfo("userDb save failed, err:%v", err)
	}
	return user, nil
}
