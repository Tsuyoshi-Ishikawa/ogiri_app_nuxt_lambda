package main

import (
	"errors"
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var (
	// ErrNon200Response non 200 status code in response
	ErrNon200Response = errors.New("Non 200 Response found")
)

type DB interface {
	Connection() *gorm.DB
}

type Database struct {}

func (d *Database) Connection () *gorm.DB {
	// conInfo := "default:secret@tcp(ogiri_mysql_app:3307)/sample_db?charset=utf8&parseTime=True&loc=Local"
	conInfo := "root:@tcp(localhost:3307)/sample_db?charset=utf8&parseTime=True&loc=Local"
	db,err := gorm.Open("mysql", conInfo)
	if err != nil {
		fmt.Println("connection error!!!")
		fmt.Println(err)
	}

	return db
}

type User struct {
	Name string
}

type infoResponse struct {
    Info string `json:"info"`
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// エラーreturnで使用,条件は適宜変える
	// if resp.StatusCode != 200 {
	// 	return events.APIGatewayProxyResponse{}, ErrNon200Response
	// }

	conn := Database{}
	DB := conn.Connection()

	user := User{Name: "ishikawa"}
	// DB.Select("Name").Create(&user)
	DB.Create(&user)

	Info := infoResponse {
		Info: "this is infomation",
	}
	jsonBytes, _ := json.Marshal(Info)

	return events.APIGatewayProxyResponse{
		Body:       string(jsonBytes),
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(handler)
}
