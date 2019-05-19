package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/spf13/viper"
)

func init() {
	viper.SetEnvPrefix("YUGE")
	viper.AutomaticEnv()
	viper.SetDefault("PORT", ":8080")

}

func main() {
	http.HandleFunc("/", StatusHandleFunc)

	fmt.Printf("PORT=%v\n", viper.GetString("PORT"))
	log.Fatal(http.ListenAndServe(viper.GetString("PORT"), nil))
}

func initConfig() {
}
