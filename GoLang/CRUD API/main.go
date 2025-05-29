package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type Director struct {
	FName string `json:"firstname"`
	LName string `json:"lastname"`
}
type Movie struct {
	ID       string    `json:"id"`
	Isbn     string    `json:"isbn"`
	Title    string    `json:"title"`
	Director *Director `json:"director"`
}

var movies []Movie

func getMovies(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movies)
}

func getMovie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	val := mux.Vars(r)
	for _, movie := range movies {
		if movie.ID == val["id"] {
			json.NewEncoder(w).Encode(movie)
			return
		}
	}
	http.Error(w, "Movie not found", http.StatusNotFound)
}

func createMovie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var movie Movie
	_ = json.NewDecoder(r.Body).Decode(&movie)
	movie.ID = strconv.Itoa(rand.Intn(1000000000))
	movies = append(movies, movie)
	json.NewEncoder(w).Encode(movie)
}

func updateMovie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	val := mux.Vars(r)
	for x, y := range movies {
		if y.ID == val["id"] {
			movies = append(movies[:x], movies[x+1:]...)
		}
		var movie Movie
		_ = json.NewDecoder(r.Body).Decode(&movie)
		movie.ID = strconv.Itoa(rand.Intn(1000000000))
		movies = append(movies, movie)
		json.NewEncoder(w).Encode(movie)
	}
}

func deleteMovie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	val := mux.Vars(r)
	for x, mo := range movies {
		if mo.ID == val["id"] {
			movies = append(movies[:x], movies[x+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(movies)
}

func main() {
	router := mux.NewRouter()

	movies = append(movies, Movie{ID: "101", Isbn: "987", Title: "Singham", Director: &Director{FName: "Rohit", LName: "Shetty"}})
	movies = append(movies, Movie{ID: "102", Isbn: "988", Title: "Gangs of Wasseypur", Director: &Director{FName: "Anurag", LName: "Kashyap"}})
	movies = append(movies, Movie{ID: "103", Isbn: "989", Title: "Dangal", Director: &Director{FName: "Nitesh", LName: "Tiwari"}})
	movies = append(movies, Movie{ID: "104", Isbn: "990", Title: "Drishyam", Director: &Director{FName: "Jeethu", LName: "Joseph"}})

	router.HandleFunc("/movies", getMovies).Methods("GET")
	router.HandleFunc("/movies/{id}", getMovie).Methods("GET")
	router.HandleFunc("/movies", createMovie).Methods("POST")
	router.HandleFunc("/movies", updateMovie).Methods("PUT")
	router.HandleFunc("/movies", deleteMovie).Methods("DELETE")

	fmt.Println("Starting Server")
	err := http.ListenAndServe(":2211", router)
	if err != nil {
		log.Fatal(err)
	}
}
