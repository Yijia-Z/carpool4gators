package database

import (
	"education/query"
	"fmt"
	"github.com/spf13/viper"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
)

var(
	Query *query.Query
)

// InitMysql 初始化数据库
func InitMysql() {
	dns := fmt.Sprintf("%s:%s@tcp(%s)/%s%s", viper.GetString("mysql.username"), viper.GetString("mysql.password"),
		viper.GetString("mysql.addr"), viper.GetString("mysql.name"),"?charset=utf8&parseTime=true")
	db, err := openDB(dns)
	if err != nil {
		panic(err)
	}
	Query = initQuery(db)
	log.Println("connect mysql success")
}

// openDB 连接数据库
func openDB(dns string) (*gorm.DB, error) {
	db, err := gorm.Open(mysql.Open(dns))
	if err != nil {
		return nil, err
	}
	return db, nil
}

func initQuery(sqlDB *gorm.DB) *query.Query{
	return query.Use(sqlDB.Debug())
}
