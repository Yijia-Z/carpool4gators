package main

import (
	"education/config"
	"education/database"
	"education/router"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
)

var (
	cfg = pflag.StringP("config", "c", "conf/config_release.yaml", "input the config")
)

func init() {
	pflag.Parse()
	if err := config.InitConfig(*cfg); err != nil {
		panic(err)
	}
	database.InitMysql()
}

func main() {
	g := gin.Default()
	g.Use(gin.Logger(), gin.Recovery())
	g.Use(cors.Default())
	router.InitRouter(g)
	g.Run(viper.GetString("addr"))
}
