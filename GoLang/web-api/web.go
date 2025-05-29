package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("###### Welcome to our Todolist App! ######")

	http.HandleFunc("/hello", service)
	// http.HandleFunc registers the handler function for the given pattern
	// "/hello" is the root URL path, meaning that this function will handle requests to the root of the server
	// Their will be nothing at localhost:5055 because url path is not specified
	// service is the function that will be called when a request is made to the "/hello" path
	// The service function will handle the HTTP requests and responses

	err := http.ListenAndServe(":5055", nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
	//http.ListenAndServe starts an HTTP server on the specified port
	// ":5055" means the server will listen on port 5055
	// nil means that we are not using any custom handler, so the default handler will be used
}

func service(writer http.ResponseWriter, request *http.Request) {
	welcome := "###### Welcome to our Todolist App! ######"
	fmt.Fprintln(writer, welcome)
}

func printTasks(taskItems []string) {
	fmt.Println("List of my Todos")
	for index, task := range taskItems {
		fmt.Printf("%d: %s\n", index+1, task)
	}
}

func addTask(taskItems []string, newTask string) []string {
	var updatedTaskItems = append(taskItems, newTask)
	return updatedTaskItems
}

//   var shortGolang = "Watch Go crash course"
//   var fullGolang = "Watch Nana's Golang Full Course"
//   var rewardDessert = "Reward myself with a donut"
//   var taskItems = []string{shortGolang, fullGolang, rewardDessert}

//   printTasks(taskItems)
//   fmt.Println()

//   taskItems = addTask(taskItems, "Go for a run")
//   taskItems = addTask(taskItems, "Practice coding in Go")

//   fmt.Println("Updated list")
//   printTasks(taskItems)
