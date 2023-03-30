package driver

import (
	"education/common"
	errno "education/common/erron"
	"education/database"
	"education/model"
	"education/util"
	"errors"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func HandleDriverRegister(c *gin.Context) {
	var driver model.Driver

	err := c.ShouldBindJSON(&driver)
	if err != nil {
		log.Printf("ShouldBindJSON driver failed, err:%v\n", err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}

	if err := checkAddParams(&driver); err != nil {
		log.Printf("checkAddParams failed, req:%v, err:%v\n", driver, err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}

	driverInfo, err := addDriver(c, &driver)
	if err != nil {
		log.Printf("addUser failed, driver:%v, err:%v\n", driver, err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}

	common.SendResponse(c, errno.OK, driverInfo)
}

func checkAddParams(driver *model.Driver) error {

	if len(driver.Username) == 0 {
		return util.BuildErrorInfo("用户名为空")
	}

	if len(driver.Password) == 0 {
		return util.BuildErrorInfo("密码为空")
	}

	if driver.Phone == "" {
		return util.BuildErrorInfo("手机号为空")
	}

	if driver.Email == "" {
		return util.BuildErrorInfo("邮箱为空")
	}

	return nil
}

func addDriver(c *gin.Context, driver *model.Driver) (*model.Driver, error) {
	driverDb := database.Query.Driver
	old, err := driverDb.WithContext(c).Where(driverDb.Phone.Eq(driver.Phone)).First()
	if err != nil && err != gorm.ErrRecordNotFound {
		log.Printf("driverDb query failed, err:%v\n", err)
		return nil, err
	}
	if old != nil {
		log.Printf("该手机号已存在")
		return nil, util.BuildErrorInfo("该手机号已存在")
	}

	driver.DriverID = util.GeneDriverID(driver.Phone)
	driver.CreateTime = time.Now().Unix()
	driver.UpdateTime = time.Now().Unix()
	err = driverDb.WithContext(c).Create(driver)
	if err != nil {
		log.Printf("driverDb create driver failed,err:%v\n", err)
		return nil, err
	}

	return driver, nil
}

func HandleDriverLogin(c *gin.Context) {
	var driver model.Driver

	err := c.ShouldBindJSON(&driver)
	if err != nil {
		log.Printf("ShouldBindJSON driver failed, err:%v\n", err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}

	if err := checkLoginParams(&driver); err != nil {
		log.Printf("checkAddParams failed, req:%v, err:%v\n", driver, err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}

	driverInfo, err := driverLogin(c, &driver)
	if err != nil {
		log.Printf("addUser failed, driver:%v, err:%v\n", driver, err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}

	timestr := fmt.Sprintf("%d", time.Now().UnixNano())
	token := util.GetMD5([]byte(timestr))

	common.SendDriverLoginResp(c, errno.OK, driverInfo.DriverID, token)
}

func checkLoginParams(driver *model.Driver) error {

	if len(driver.Phone) == 0 {
		return util.BuildErrorInfo("用户名为空")
	}

	if len(driver.Password) == 0 {
		return util.BuildErrorInfo("密码为空")
	}

	return nil
}

func driverLogin(c *gin.Context, driver *model.Driver) (*model.Driver, error) {
	driverDb := database.Query.Driver
	old, err := driverDb.WithContext(c).Where(driverDb.Phone.Eq(driver.Phone)).First()
	if err != nil && err != gorm.ErrRecordNotFound {
		log.Printf("driverDb query failed, err:%v\n", err)
		return nil, err
	}

	if old == nil {
		return nil, util.BuildErrorInfo("用户不存在")
	}

	if old.Password != driver.Password {
		return nil, util.BuildErrorInfo("密码错误")
	}

	driver.DriverID = old.DriverID
	return driver, nil
}

func HandleDriverInfoGet(c *gin.Context) {
	driverId := c.Param("driverId")

	if len(driverId) == 0 {
		common.SendResponse(c, errno.ErrParams, errors.New("driverid missing"))
		return
	}

	driver_id, err := strconv.ParseInt(driverId, 10, 64)
	if err != nil {
		common.SendResponse(c, errno.ErrParams, errors.New("driverid format err"))
		return
	}

	log.Println(driver_id)

	driver, err := getDriverById(c, driver_id)
	if err != nil {
		log.Printf("getDriverById failed, req:%v, err:%v\n", driver, err)
		common.SendResponse(c, errno.OperationErr, err.Error())
		return
	}

	common.SendResponse(c, nil, driver)
}

func HandleDriverInfoUpdate(c *gin.Context) {
	driverId := c.Param("driverId")

	if len(driverId) == 0 {
		common.SendResponse(c, errno.ErrParams, errors.New("driverid missing"))
		return
	}

	driver_id, err := strconv.ParseInt(driverId, 10, 64)
	if err != nil {
		common.SendResponse(c, errno.ErrParams, errors.New("driverid format err"))
		return
	}
	log.Println(driver_id)

	var driver model.Driver
	err = c.ShouldBindJSON(&driver)
	if err != nil {
		log.Printf("ShouldBindJSON driver failed, err:%v\n", err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}

	if err = checkUpdateParam(driver); err != nil {
		log.Printf("checkParam failed, req:%v, err:%v\n", driver, err)
		common.SendResponse(c, errno.NoParams, err.Error())
		return
	}
	old, err := getDriverById(c, driver.DriverID)
	if err != nil {
		log.Printf("getDriverById failed, req:%v, err:%v\n", driver, err)
		common.SendResponse(c, errno.OperationErr, err.Error())
		return
	}

	err = updateDriver(c, old, &driver)
	if err != nil {
		log.Printf("updateDriver failed, req:%v, err:%v\n", driver, err)
		common.SendResponse(c, errno.OperationErr, err.Error())
		return
	}

	common.SendResponse(c, errno.OK, nil)
}

func checkUpdateParam(driver model.Driver) error {
	if driver.DriverID == 0 {
		return util.BuildErrorInfo("DriverID为空")
	}

	return nil
}

func getDriverById(c *gin.Context, id int64) (*model.Driver, error) {
	driverDb := database.Query.Driver
	user, err := driverDb.WithContext(c).Where(driverDb.DriverID.Eq(id)).First()
	if err != nil && err != gorm.ErrRecordNotFound {
		log.Printf("driverDb query failed, id:%v, err:%v\n", id, err)
		return nil, util.BuildErrorInfo("driverDb query failed, err:%v", err)
	}
	if user == nil {
		return nil, util.BuildErrorInfo("用户不存在")
	}
	return user, nil
}

func updateDriver(c *gin.Context, driver *model.Driver, req *model.Driver) error {

	if req.Username != "" {
		driver.Username = req.Username
	}

	if req.Password != "" {
		driver.Password = req.Password
	}

	if req.Phone != "" {
		driver.Phone = req.Phone
	}

	if req.Email != "" {
		driver.Email = req.Email
	}

	driver.UpdateTime = time.Now().Unix()
	driverDb := database.Query.Driver
	err := driverDb.WithContext(c).Save(driver)
	if err != nil {
		log.Printf("driverDb save failed, driver:%v, req:%v, err:%v", driver, req, err)
		return util.BuildErrorInfo("driverDb save failed, err:%v", err)
	}

	return nil
}
