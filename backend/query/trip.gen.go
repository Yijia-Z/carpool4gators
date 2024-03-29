// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package query

import (
	"context"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"gorm.io/gorm/schema"

	"gorm.io/gen"
	"gorm.io/gen/field"

	"gorm.io/plugin/dbresolver"

	"education/model"
)

func newTrip(db *gorm.DB, opts ...gen.DOOption) trip {
	_trip := trip{}

	_trip.tripDo.UseDB(db, opts...)
	_trip.tripDo.UseModel(&model.Trip{})

	tableName := _trip.tripDo.TableName()
	_trip.ALL = field.NewAsterisk(tableName)
	_trip.TripID = field.NewInt64(tableName, "trip_id")
	_trip.DriverID = field.NewInt64(tableName, "driver_id")
	_trip.Tripstatus = field.NewInt64(tableName, "tripstatus")
	_trip.Start = field.NewString(tableName, "start")
	_trip.Destination = field.NewString(tableName, "destination")
	_trip.Date = field.NewString(tableName, "date")
	_trip.SeatCounts = field.NewInt64(tableName, "seat_counts")
	_trip.AvailableSeats = field.NewInt64(tableName, "available_seats")
	_trip.Price = field.NewFloat64(tableName, "price")
	_trip.ContactInfo = field.NewString(tableName, "contact_info")
	_trip.PassengerList = field.NewString(tableName, "passenger_list")

	_trip.fillFieldMap()

	return _trip
}

type trip struct {
	tripDo tripDo

	ALL            field.Asterisk
	TripID         field.Int64
	DriverID       field.Int64
	Tripstatus     field.Int64
	Start          field.String
	Destination    field.String
	Date           field.String
	SeatCounts     field.Int64
	AvailableSeats field.Int64
	Price          field.Float64
	ContactInfo    field.String
	PassengerList  field.String

	fieldMap map[string]field.Expr
}

func (t trip) Table(newTableName string) *trip {
	t.tripDo.UseTable(newTableName)
	return t.updateTableName(newTableName)
}

func (t trip) As(alias string) *trip {
	t.tripDo.DO = *(t.tripDo.As(alias).(*gen.DO))
	return t.updateTableName(alias)
}

func (t *trip) updateTableName(table string) *trip {
	t.ALL = field.NewAsterisk(table)
	t.TripID = field.NewInt64(table, "trip_id")
	t.DriverID = field.NewInt64(table, "driver_id")
	t.Tripstatus = field.NewInt64(table, "tripstatus")
	t.Start = field.NewString(table, "start")
	t.Destination = field.NewString(table, "destination")
	t.Date = field.NewString(table, "date")
	t.SeatCounts = field.NewInt64(table, "seat_counts")
	t.AvailableSeats = field.NewInt64(table, "available_seats")
	t.Price = field.NewFloat64(table, "price")
	t.ContactInfo = field.NewString(table, "contact_info")
	t.PassengerList = field.NewString(table, "passenger_list")

	t.fillFieldMap()

	return t
}

func (t *trip) WithContext(ctx context.Context) ITripDo { return t.tripDo.WithContext(ctx) }

func (t trip) TableName() string { return t.tripDo.TableName() }

func (t trip) Alias() string { return t.tripDo.Alias() }

func (t *trip) GetFieldByName(fieldName string) (field.OrderExpr, bool) {
	_f, ok := t.fieldMap[fieldName]
	if !ok || _f == nil {
		return nil, false
	}
	_oe, ok := _f.(field.OrderExpr)
	return _oe, ok
}

func (t *trip) fillFieldMap() {
	t.fieldMap = make(map[string]field.Expr, 11)
	t.fieldMap["trip_id"] = t.TripID
	t.fieldMap["driver_id"] = t.DriverID
	t.fieldMap["tripstatus"] = t.Tripstatus
	t.fieldMap["start"] = t.Start
	t.fieldMap["destination"] = t.Destination
	t.fieldMap["date"] = t.Date
	t.fieldMap["seat_counts"] = t.SeatCounts
	t.fieldMap["available_seats"] = t.AvailableSeats
	t.fieldMap["price"] = t.Price
	t.fieldMap["contact_info"] = t.ContactInfo
	t.fieldMap["passenger_list"] = t.PassengerList
}

func (t trip) clone(db *gorm.DB) trip {
	t.tripDo.ReplaceConnPool(db.Statement.ConnPool)
	return t
}

func (t trip) replaceDB(db *gorm.DB) trip {
	t.tripDo.ReplaceDB(db)
	return t
}

type tripDo struct{ gen.DO }

type ITripDo interface {
	gen.SubQuery
	Debug() ITripDo
	WithContext(ctx context.Context) ITripDo
	WithResult(fc func(tx gen.Dao)) gen.ResultInfo
	ReplaceDB(db *gorm.DB)
	ReadDB() ITripDo
	WriteDB() ITripDo
	As(alias string) gen.Dao
	Session(config *gorm.Session) ITripDo
	Columns(cols ...field.Expr) gen.Columns
	Clauses(conds ...clause.Expression) ITripDo
	Not(conds ...gen.Condition) ITripDo
	Or(conds ...gen.Condition) ITripDo
	Select(conds ...field.Expr) ITripDo
	Where(conds ...gen.Condition) ITripDo
	Order(conds ...field.Expr) ITripDo
	Distinct(cols ...field.Expr) ITripDo
	Omit(cols ...field.Expr) ITripDo
	Join(table schema.Tabler, on ...field.Expr) ITripDo
	LeftJoin(table schema.Tabler, on ...field.Expr) ITripDo
	RightJoin(table schema.Tabler, on ...field.Expr) ITripDo
	Group(cols ...field.Expr) ITripDo
	Having(conds ...gen.Condition) ITripDo
	Limit(limit int) ITripDo
	Offset(offset int) ITripDo
	Count() (count int64, err error)
	Scopes(funcs ...func(gen.Dao) gen.Dao) ITripDo
	Unscoped() ITripDo
	Create(values ...*model.Trip) error
	CreateInBatches(values []*model.Trip, batchSize int) error
	Save(values ...*model.Trip) error
	First() (*model.Trip, error)
	Take() (*model.Trip, error)
	Last() (*model.Trip, error)
	Find() ([]*model.Trip, error)
	FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.Trip, err error)
	FindInBatches(result *[]*model.Trip, batchSize int, fc func(tx gen.Dao, batch int) error) error
	Pluck(column field.Expr, dest interface{}) error
	Delete(...*model.Trip) (info gen.ResultInfo, err error)
	Update(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	Updates(value interface{}) (info gen.ResultInfo, err error)
	UpdateColumn(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateColumnSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	UpdateColumns(value interface{}) (info gen.ResultInfo, err error)
	UpdateFrom(q gen.SubQuery) gen.Dao
	Attrs(attrs ...field.AssignExpr) ITripDo
	Assign(attrs ...field.AssignExpr) ITripDo
	Joins(fields ...field.RelationField) ITripDo
	Preload(fields ...field.RelationField) ITripDo
	FirstOrInit() (*model.Trip, error)
	FirstOrCreate() (*model.Trip, error)
	FindByPage(offset int, limit int) (result []*model.Trip, count int64, err error)
	ScanByPage(result interface{}, offset int, limit int) (count int64, err error)
	Scan(result interface{}) (err error)
	Returning(value interface{}, columns ...string) ITripDo
	UnderlyingDB() *gorm.DB
	schema.Tabler
}

func (t tripDo) Debug() ITripDo {
	return t.withDO(t.DO.Debug())
}

func (t tripDo) WithContext(ctx context.Context) ITripDo {
	return t.withDO(t.DO.WithContext(ctx))
}

func (t tripDo) ReadDB() ITripDo {
	return t.Clauses(dbresolver.Read)
}

func (t tripDo) WriteDB() ITripDo {
	return t.Clauses(dbresolver.Write)
}

func (t tripDo) Session(config *gorm.Session) ITripDo {
	return t.withDO(t.DO.Session(config))
}

func (t tripDo) Clauses(conds ...clause.Expression) ITripDo {
	return t.withDO(t.DO.Clauses(conds...))
}

func (t tripDo) Returning(value interface{}, columns ...string) ITripDo {
	return t.withDO(t.DO.Returning(value, columns...))
}

func (t tripDo) Not(conds ...gen.Condition) ITripDo {
	return t.withDO(t.DO.Not(conds...))
}

func (t tripDo) Or(conds ...gen.Condition) ITripDo {
	return t.withDO(t.DO.Or(conds...))
}

func (t tripDo) Select(conds ...field.Expr) ITripDo {
	return t.withDO(t.DO.Select(conds...))
}

func (t tripDo) Where(conds ...gen.Condition) ITripDo {
	return t.withDO(t.DO.Where(conds...))
}

func (t tripDo) Exists(subquery interface{ UnderlyingDB() *gorm.DB }) ITripDo {
	return t.Where(field.CompareSubQuery(field.ExistsOp, nil, subquery.UnderlyingDB()))
}

func (t tripDo) Order(conds ...field.Expr) ITripDo {
	return t.withDO(t.DO.Order(conds...))
}

func (t tripDo) Distinct(cols ...field.Expr) ITripDo {
	return t.withDO(t.DO.Distinct(cols...))
}

func (t tripDo) Omit(cols ...field.Expr) ITripDo {
	return t.withDO(t.DO.Omit(cols...))
}

func (t tripDo) Join(table schema.Tabler, on ...field.Expr) ITripDo {
	return t.withDO(t.DO.Join(table, on...))
}

func (t tripDo) LeftJoin(table schema.Tabler, on ...field.Expr) ITripDo {
	return t.withDO(t.DO.LeftJoin(table, on...))
}

func (t tripDo) RightJoin(table schema.Tabler, on ...field.Expr) ITripDo {
	return t.withDO(t.DO.RightJoin(table, on...))
}

func (t tripDo) Group(cols ...field.Expr) ITripDo {
	return t.withDO(t.DO.Group(cols...))
}

func (t tripDo) Having(conds ...gen.Condition) ITripDo {
	return t.withDO(t.DO.Having(conds...))
}

func (t tripDo) Limit(limit int) ITripDo {
	return t.withDO(t.DO.Limit(limit))
}

func (t tripDo) Offset(offset int) ITripDo {
	return t.withDO(t.DO.Offset(offset))
}

func (t tripDo) Scopes(funcs ...func(gen.Dao) gen.Dao) ITripDo {
	return t.withDO(t.DO.Scopes(funcs...))
}

func (t tripDo) Unscoped() ITripDo {
	return t.withDO(t.DO.Unscoped())
}

func (t tripDo) Create(values ...*model.Trip) error {
	if len(values) == 0 {
		return nil
	}
	return t.DO.Create(values)
}

func (t tripDo) CreateInBatches(values []*model.Trip, batchSize int) error {
	return t.DO.CreateInBatches(values, batchSize)
}

// Save : !!! underlying implementation is different with GORM
// The method is equivalent to executing the statement: db.Clauses(clause.OnConflict{UpdateAll: true}).Create(values)
func (t tripDo) Save(values ...*model.Trip) error {
	if len(values) == 0 {
		return nil
	}
	return t.DO.Save(values)
}

func (t tripDo) First() (*model.Trip, error) {
	if result, err := t.DO.First(); err != nil {
		return nil, err
	} else {
		return result.(*model.Trip), nil
	}
}

func (t tripDo) Take() (*model.Trip, error) {
	if result, err := t.DO.Take(); err != nil {
		return nil, err
	} else {
		return result.(*model.Trip), nil
	}
}

func (t tripDo) Last() (*model.Trip, error) {
	if result, err := t.DO.Last(); err != nil {
		return nil, err
	} else {
		return result.(*model.Trip), nil
	}
}

func (t tripDo) Find() ([]*model.Trip, error) {
	result, err := t.DO.Find()
	return result.([]*model.Trip), err
}

func (t tripDo) FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.Trip, err error) {
	buf := make([]*model.Trip, 0, batchSize)
	err = t.DO.FindInBatches(&buf, batchSize, func(tx gen.Dao, batch int) error {
		defer func() { results = append(results, buf...) }()
		return fc(tx, batch)
	})
	return results, err
}

func (t tripDo) FindInBatches(result *[]*model.Trip, batchSize int, fc func(tx gen.Dao, batch int) error) error {
	return t.DO.FindInBatches(result, batchSize, fc)
}

func (t tripDo) Attrs(attrs ...field.AssignExpr) ITripDo {
	return t.withDO(t.DO.Attrs(attrs...))
}

func (t tripDo) Assign(attrs ...field.AssignExpr) ITripDo {
	return t.withDO(t.DO.Assign(attrs...))
}

func (t tripDo) Joins(fields ...field.RelationField) ITripDo {
	for _, _f := range fields {
		t = *t.withDO(t.DO.Joins(_f))
	}
	return &t
}

func (t tripDo) Preload(fields ...field.RelationField) ITripDo {
	for _, _f := range fields {
		t = *t.withDO(t.DO.Preload(_f))
	}
	return &t
}

func (t tripDo) FirstOrInit() (*model.Trip, error) {
	if result, err := t.DO.FirstOrInit(); err != nil {
		return nil, err
	} else {
		return result.(*model.Trip), nil
	}
}

func (t tripDo) FirstOrCreate() (*model.Trip, error) {
	if result, err := t.DO.FirstOrCreate(); err != nil {
		return nil, err
	} else {
		return result.(*model.Trip), nil
	}
}

func (t tripDo) FindByPage(offset int, limit int) (result []*model.Trip, count int64, err error) {
	result, err = t.Offset(offset).Limit(limit).Find()
	if err != nil {
		return
	}

	if size := len(result); 0 < limit && 0 < size && size < limit {
		count = int64(size + offset)
		return
	}

	count, err = t.Offset(-1).Limit(-1).Count()
	return
}

func (t tripDo) ScanByPage(result interface{}, offset int, limit int) (count int64, err error) {
	count, err = t.Count()
	if err != nil {
		return
	}

	err = t.Offset(offset).Limit(limit).Scan(result)
	return
}

func (t tripDo) Scan(result interface{}) (err error) {
	return t.DO.Scan(result)
}

func (t tripDo) Delete(models ...*model.Trip) (result gen.ResultInfo, err error) {
	return t.DO.Delete(models)
}

func (t *tripDo) withDO(do gen.Dao) *tripDo {
	t.DO = *do.(*gen.DO)
	return t
}
