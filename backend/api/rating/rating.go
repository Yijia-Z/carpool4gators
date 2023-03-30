package rating

import (
	"education/common"
	errno "education/common/erron"
	"errors"
	"log"
	"strconv"

	"education/database"
	"education/model"

	"github.com/gin-gonic/gin"
)

func HandleDriverRateList(c *gin.Context) {

	driverID := c.Param("driverId")
	if len(driverID) == 0 {
		common.SendResponse(c, errno.ErrParams, errors.New("driverid missing"))
		return
	}

	driver_id, err := strconv.ParseInt(driverID, 10, 64)
	if err != nil {
		common.SendResponse(c, errno.ErrParams, errors.New("driverid format err"))
		return
	}

	log.Println(driver_id)

	ratings, err := queryRatings(c, driver_id)
	if err != nil {
		common.SendResponse(c, errno.OperationErr, err)
		return
	}

	log.Println(len(ratings))
	common.SendResponse(c, nil, ratings)
	return
}

func queryRatings(c *gin.Context, driverId int64) ([]*model.Rating, error) {
	rateDb := database.Query.Rating
	return rateDb.WithContext(c).Where(rateDb.DriverID.Eq(driverId)).Find()
}
