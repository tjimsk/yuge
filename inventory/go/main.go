package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/spf13/viper"
)

func main() {

	viper.SetEnvPrefix("YUGE")
	viper.AutomaticEnv()
	viper.SetDefault("PORT", ":8080")

	fmt.Printf("PORT=%v\n", viper.GetString("PORT"))

	log.Fatal(http.ListenAndServe(viper.GetString("PORT")), nil)
}
