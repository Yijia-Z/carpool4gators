package trip

import (
	"education/api/driver"
	"education/common"
	errno "education/common/erron"
	"education/database"
	"education/model"
	"education/model/model_overview"
	"education/util"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/shopspring/decimal"
)

const (
	StatusCreated   = 0
	StatusStarted   = 1
	StatusCanceled  = 2
	StatusConfirmed = 3
)

func HandleCreateTrip(c *gin.Context) {
	var reqdata model.Trip

	err := c.ShouldBindJSON(&reqdata)
	if err != nil {
		log.Printf("ShouldBindJSON reqdata failed, err:%v\n", err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}

	if reqdata.DriverID == 0 {
		common.SendResponse(c, errno.ErrParams, "driverid missing")
		return
	}

	if err := checkCreateParams(&reqdata); err != nil {
		log.Printf("checkCreateParams failed, req:%v, err:%v\n", reqdata, err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}

	result, err := createTrip(c, &reqdata, reqdata.DriverID)
	if err != nil {
		log.Printf("create trip failed, reqdata:%v, err:%v\n", reqdata, err)
		common.SendResponse(c, errno.OperationErr, err.Error())
		return
	}

	common.SendCreateTripResp(c, errno.OK, result.TripID)
}

func checkCreateParams(trip *model.Trip) error {
	if len(trip.Start) == 0 {
		return util.BuildErrorInfo("出发地为空")
	}

	if len(trip.Destination) == 0 {
		return util.BuildErrorInfo("目的地为空")
	}

	if len(trip.Date) == 0 {
		return util.BuildErrorInfo("行程日期为空")
	}

	if trip.SeatCounts <= 0 {
		return util.BuildErrorInfo("座位数量不足")
	}

	if trip.AvailableSeats <= 0 {
		return util.BuildErrorInfo("剩余座位数量不足")
	}

	if trip.Price < 0 {
		return util.BuildErrorInfo("价格参数有误")
	}

	if len(trip.ContactInfo) == 0 {
		return util.BuildErrorInfo("缺少联系方式")
	}

	return nil
}

func createTrip(c *gin.Context, trip *model.Trip, driverID int64) (*model.Trip, error) {

	_, err := driver.GetDriverById(c, driverID)
	if err != nil {
		return nil, err
	}

	tripDb := database.Query.Trip

	trip.TripID = util.GeneTripID(fmt.Sprintf("%v%s%s%v", driverID, trip.Start, trip.Destination, time.Now().UnixNano()))
	trip.Tripstatus = StatusCreated
	trip.DriverID = driverID

	err = tripDb.WithContext(c).Create(trip)
	if err != nil {
		log.Printf("driverDb create driver failed,err:%v\n", err)
		return nil, err
	}

	return trip, nil
}

func HandleTripsQuery(c *gin.Context) {
	var reqdata model.Trip

	err := c.ShouldBindJSON(&reqdata)
	if err != nil {
		log.Printf("ShouldBindJSON reqdata failed, err:%v\n", err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}

	if err := checkTripsGetParams(&reqdata); err != nil {
		log.Printf("checkTripsGetParams failed, req:%v, err:%v\n", reqdata, err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}

	results, err := queryTrip(c, &reqdata)
	if err != nil {
		log.Printf("query trip failed, reqdata:%v, err:%v\n", reqdata, err)
		common.SendResponse(c, errno.OperationErr, err.Error())
		return
	}

	common.SendResponse(c, nil, results)
}

func checkTripsGetParams(trip *model.Trip) error {
	if len(trip.Start) == 0 {
		return util.BuildErrorInfo("出发地为空")
	}

	if len(trip.Destination) == 0 {
		return util.BuildErrorInfo("目的地为空")
	}

	if len(trip.Date) == 0 {
		return util.BuildErrorInfo("行程日期为空")
	}

	if trip.AvailableSeats <= 0 {
		return util.BuildErrorInfo("剩余座位数量为空")
	}

	return nil
}

func queryTrip(c *gin.Context, trip *model.Trip) ([]*model.Trip, error) {
	tripDb := database.Query.Trip

	return tripDb.WithContext(c).Where(tripDb.Start.Eq(trip.Start),
		tripDb.Destination.Eq(trip.Destination),
		tripDb.Date.Gte(trip.Date),
		tripDb.AvailableSeats.Gte(trip.AvailableSeats),
		tripDb.Tripstatus.Eq(StatusCreated),
	).Find()
}

func HandleTripJoin(c *gin.Context) {
	tripId := c.Param("tripId")

	if len(tripId) == 0 {
		common.SendResponse(c, errno.ErrParams, "tripid missing")
		return
	}

	trip_id, err := strconv.ParseInt(tripId, 10, 64)
	if err != nil {
		common.SendResponse(c, errno.ErrParams, "tripId format err")
		return
	}

	var joinReq model_overview.TripJoinReq
	err = c.ShouldBindJSON(&joinReq)
	if err != nil {
		log.Printf("ShouldBindJSON joinReq failed, err:%v\n", err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}

	if len(joinReq.UserId) == 0 {
		common.SendResponse(c, errno.ErrParams, "userid missing")
	}

	if joinReq.Seats <= 0 {
		common.SendResponse(c, errno.ErrParams, "seats count invalid")
		return
	}

	err = joinTrip(c, joinReq, trip_id)
	if err != nil {
		common.SendResponse(c, errno.OperationErr, err.Error())
		return
	}

	common.SendResponse(c, errno.OK, "ok")
}

var m sync.Mutex

func joinTrip(c *gin.Context, joinReq model_overview.TripJoinReq, trip_id int64) error {
	m.Lock()

	defer func() {
		log.Println("unlock m")
		m.Unlock()
	}()

	tripDb := database.Query.Trip

	trip, err := tripDb.WithContext(c).Where(tripDb.TripID.Eq(trip_id)).First()
	if err != nil {
		log.Printf("tripDb query failed, id:%v, err:%v\n", trip_id, err)
		return err
	}

	if trip.Tripstatus != StatusCreated {
		return errors.New("行程已开始")
	}

	if trip.AvailableSeats < joinReq.Seats {
		return errors.New("剩余座位不足")
	}

	var passengers = make([]model_overview.TripJoinReq, 0)

	json.NewDecoder(strings.NewReader(trip.PassengerList)).Decode(&passengers)

	passengers = append(passengers, joinReq)

	passengrestr, _ := json.Marshal(passengers)

	_, err = tripDb.WithContext(c).Where(tripDb.TripID.Eq(trip_id)).Updates(map[string]interface{}{
		"tripstatus":      StatusStarted,
		"available_seats": trip.AvailableSeats - joinReq.Seats,
		"passenger_list":  string(passengrestr),
	})

	return nil
}

func HandleTripCancel(c *gin.Context) {
	tripId := c.Param("tripId")

	if len(tripId) == 0 {
		common.SendResponse(c, errno.ErrParams, "tripid missing")
		return
	}

	trip_id, err := strconv.ParseInt(tripId, 10, 64)
	if err != nil {
		common.SendResponse(c, errno.ErrParams, "tripId format err")
		return
	}

	err = tripCancel(c, "", trip_id)
	if err != nil {
		common.SendResponse(c, errno.OperationErr, err.Error())
		return
	}

	common.SendResponse(c, errno.OK, "ok")
}

func tripCancel(c *gin.Context, userid string, tripId int64) error {
	tripDb := database.Query.Trip
	trip, err := tripDb.WithContext(c).Where(tripDb.TripID.Eq(tripId)).First()
	if err != nil {
		log.Printf("tripDb query failed, id:%v, err:%v\n", tripId, err)
		return err
	}

	if trip.Tripstatus == StatusCanceled {
		return errors.New("重复取消")
	}

	if trip.Tripstatus == StatusCreated {
		return errors.New("行程未开始")
	}

	_, err = tripDb.WithContext(c).Where(tripDb.TripID.Eq(tripId)).Updates(map[string]interface{}{
		"tripstatus": StatusCanceled,
	})

	return err
}

func HandleTripConfirm(c *gin.Context) {
	tripId := c.Param("tripId")

	if len(tripId) == 0 {
		common.SendResponse(c, errno.ErrParams, "tripid missing")
		return
	}

	trip_id, err := strconv.ParseInt(tripId, 10, 64)
	if err != nil {
		common.SendResponse(c, errno.ErrParams, "tripId format err")
		return
	}

	var reqparam model.Rating
	err = c.ShouldBindJSON(&reqparam)
	if err != nil {
		log.Printf("ShouldBindJSON reqparam failed, err:%v\n", err)
		common.SendResponse(c, errno.ErrParams, err.Error())
		return
	}

	if len(reqparam.UserID) == 0 {
		common.SendResponse(c, errno.ErrParams, "用户Id为空")
		return
	}

	if reqparam.Rating < 0 || reqparam.Rating > 5 {
		common.SendResponse(c, errno.ErrParams, "评分格式错误")
		return
	}

	err = tripConfirm(c, trip_id, &reqparam)
	if err != nil {
		common.SendResponse(c, errno.OperationErr, err.Error())
		return
	}

	common.SendResponse(c, errno.OK, "ok")
}

func tripConfirm(c *gin.Context, tripId int64, rating *model.Rating) error {
	stime := time.Now()

	q := database.Query
	tx := q.Begin()
	//check user exist
	_, err := tx.User.WithContext(c).Where(tx.User.ID.Eq(rating.UserID)).First()
	if err != nil {
		tx.Rollback()
		return err
	}

	//get driverid by trip
	trip, err := tx.Trip.WithContext(c).Where(tx.Trip.TripID.Eq(tripId)).First()
	if err != nil {
		tx.Rollback()
		return err
	}

	if trip.Tripstatus != StatusStarted {
		tx.Rollback()
		return errors.New("行程未开始或已关闭")
	}

	//get driver ratings
	ratings, err := tx.Rating.WithContext(c).Where(tx.Rating.DriverID.Eq(trip.DriverID)).Find()
	if err != nil {
		tx.Rollback()
		return err
	}

	var (
		count       float64
		total       float64
		currentRate float64
	)

	if len(ratings) != 0 {
		for _, one := range ratings {
			total += one.Rating
		}

		count = float64(len(ratings))

		log.Println("count,total: ", count, total)

		currentRate, _ = decimal.NewFromFloat(total).DivRound(decimal.NewFromFloat(count), 1).Float64()

	} else {
		currentRate = rating.Rating
	}

	log.Println(currentRate)

	rating.ReviewID = util.GeneReviewID(fmt.Sprintf("%s%v", rating.UserID, stime.UnixNano()))
	rating.DriverID = trip.DriverID
	rating.Timestamp = stime.Unix()

	//insert rating
	err = tx.Rating.WithContext(c).Create(rating)
	if err != nil {
		tx.Rollback()
		return err
	}

	//update trip status
	_, err = tx.Trip.WithContext(c).Where(tx.Trip.TripID.Eq(tripId)).Updates(map[string]interface{}{
		"tripstatus": StatusConfirmed,
	})
	if err != nil {
		tx.Rollback()
		return err
	}

	//update driver rating
	_, err = tx.Driver.WithContext(c).Where(tx.Driver.DriverID.Eq(trip.DriverID)).Updates(map[string]interface{}{
		"rating":      currentRate,
		"update_time": stime.Unix(),
	})
	if err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit()
}
