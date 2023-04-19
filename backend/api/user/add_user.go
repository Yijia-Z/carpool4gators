package user

import (
	"education/common"
	errno "education/common/erron"
	"education/database"
	"education/model"
	"education/util"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// 添加用户
func AddUserApi(c *gin.Context) {
	var user model.User
	err := c.ShouldBindJSON(&user)
	if err != nil {
		log.Printf("ShouldBindJSON user failed, err:%v\n", err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}
	if err := checkAddParams(&user); err != nil {
		log.Printf("checkAddParams failed, req:%v, err:%v\n", user, err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}
	userInfo, err := addUser(c, &user)
	if err != nil {
		log.Printf("addUser failed, user:%v, err:%v\n", user, err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}
	common.SendResponse(c, errno.OK, userInfo)
}

func checkAddParams(req *model.User) error {
	if req.Phone == "" {
		return util.BuildErrorInfo("手机号为空")
	}
	if req.Password == "" {
		return util.BuildErrorInfo("密码为空")
	}
	if req.Name == "" {
		return util.BuildErrorInfo("名称为空")
	}
	return nil
}
func addUser(c *gin.Context, user *model.User) (*model.User, error) {
	userDb := database.Query.User
	oldUser, err := userDb.WithContext(c).Where(userDb.Phone.Eq(user.Phone)).First()
	if err != nil && err != gorm.ErrRecordNotFound {
		log.Printf("userDb query failed, err:%v\n", err)
		return nil, err
	}
	if oldUser != nil {
		log.Printf("账号已经存在")
		return nil, util.BuildErrorInfo("账号已经存在")
	}
	user.ID = util.GetUUID()
	user.CreateTime = time.Now().Unix()
	user.UpdateTime = time.Now().Unix()
	err = userDb.WithContext(c).Create(user)
	if err != nil {
		log.Printf("userDb create user failed,err:%v\n", err)
		return nil, err
	}
	return user, nil
}
