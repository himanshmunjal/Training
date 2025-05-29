package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type New1 struct {
	Id   int    `json:"Id"`
	Name string `json:"Name"`
	Age  int    `json:"Age"`
}

type Art []New1

func print(w http.ResponseWriter, r *http.Request) {
	articles := Art{
		New1{Id: 123, Name: "Himansh Munjal", Age: 19},
	}
	fmt.Println("Endpoint Hit: All articles Endpoint")
	json.NewEncoder(w).Encode(articles)
}

func home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "HomePage Endpoint Hit")
}

func handle() {
	http.HandleFunc("/", home)
	http.HandleFunc("/New", print)
	log.Fatal(http.ListenAndServe(":8085", nil))
}

func main() {
	handle()
}
