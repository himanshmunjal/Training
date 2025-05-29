package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

type User struct {
	Name    string `json:"user"`
	Address string `json:"address"`
}

func hellohandle(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/hello" {
		http.Error(w, " 404 not found ", http.StatusNotFound)
		return
	}
	if r.Method != "GET" {
		http.Error(w, " Method error ", http.StatusNotFound)
		return
	}
	fmt.Fprintf(w, "Hello!")
}

func formhandle(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		http.ServeFile(w, r, "./static/form.html")
	case http.MethodPost:
		// Handle Form Submission
		if err := r.ParseForm(); err != nil {
			http.Error(w, fmt.Sprintf("ParseForm() Error: %v", err), http.StatusBadRequest)
			return
		}
		user := User{
			Name:    r.FormValue("name"),
			Address: r.FormValue("address"),
		}
		_, err1 := db.Exec("INSERT INTO Info (name, address) VALUES (?, ?)", user.Name, user.Address)
		if err1 != nil {
			http.Error(w, "Database Insert Failed", http.StatusInternalServerError)
			return
		}
		json, err := json.Marshal(user)
		if err != nil {
			http.Error(w, "Error Encoding JSON", http.StatusInternalServerError)
			return
		}
		fmt.Fprintf(w, "POST Request Successful\n")
		w.Write(json)
		// name := r.FormValue("name")
		// adr := r.FormValue("address")
		// fmt.Fprintf(w, "Name: %s\n", name)
		// fmt.Fprintf(w, "Address: %s\n", adr)
	default:
		fmt.Fprintf(w, "No method method selected")
	}
}

func initdb() {
	var err error
	db, err = sql.Open("mysql", "root:Ramramji@81@tcp(127.0.0.1:3306)/Testing")
	if err != nil {
		panic(err)
	}
	if err = db.Ping(); err != nil {
		panic(err)
	}
}

func main() {
	initdb()
	defer db.Close()

	file := http.FileServer(http.Dir("./static"))
	http.Handle("/", file)
	http.HandleFunc("/hello", hellohandle)
	http.HandleFunc("/form", formhandle)

	fmt.Println("Starting form")
	err := http.ListenAndServe(":8085", nil)
	if err != nil {
		log.Fatal(err)
	}
}
