package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

type Task struct {
	ID       int
	Title    string
	Priority int
	Complete bool
}

// Initialize Database
func initDB() {
	var err error
	db, err = sql.Open("mysql", "root:Ramramji@81@tcp(127.0.0.1:3306)/todoapp")
	// sql.Open() initalizes a connection between database
	//sql.Open("database driver", "user:password@tcp(localhost: )/database_name")
	if err != nil {
		panic(err) //panic is to abort the execution when an unrecoverable error occurs
	}
	if err = db.Ping(); err != nil { // Ping check if connection is still alive or not
		panic(err)
	}
	fmt.Println("✅ Connected to MySQL Database!")
}

// Add Task
func addTask() {
	var task Task
	fmt.Print("Enter task Title: ")
	fmt.Scan(&task.Title)
	fmt.Print("Enter task Priority: ")
	fmt.Scan(&task.Priority)
	task.Complete = false

	_, err := db.Exec("INSERT INTO lists (title, priority, complete) VALUES (?, ?, ?)", task.Title, task.Priority, task.Complete)
	// db.Exec() is used to execute a QUERY in sql that dosen't return anything
	// ? is used to prevent SQL injection attacks
	if err != nil {
		log.Println("Error adding task:", err)
		return
	}
	fmt.Println("Task Added!")
}

// Mark Task Complete
func markComplete() {
	var id int
	fmt.Print("Enter ID of task to mark Complete: ")
	fmt.Scan(&id)

	_, err := db.Exec("UPDATE lists SET complete = TRUE WHERE id = ?", id)
	if err != nil {
		log.Println("Error marking task complete:", err)
		return
	}
	fmt.Println("Task Marked as Complete Already!")
}

// Delete Task
func deleteTask() {
	var id int
	fmt.Print("Enter ID of task to delete: ")
	fmt.Scan(&id)

	_, err := db.Exec("DELETE FROM lists WHERE id = ?", id)
	if err != nil {
		log.Println("Error deleting task:", err)
		return
	}
	fmt.Println("Task Deleted!")
}

// View Tasks
func view() {
	rows, err := db.Query("SELECT id, title, priority, complete FROM lists ORDER BY priority ASC")
	// db.Query() is used to execute a QUERY in sql that returns rows
	if err != nil {
		log.Println("Error fetching tasks:", err)
		return
	}
	defer rows.Close()

	fmt.Println("Todo List:")
	for rows.Next() {
		var task Task
		err := rows.Scan(&task.ID, &task.Title, &task.Priority, &task.Complete)
		// rows.Scan() is used to read the data from the rows returned by the query
		// it maps the columns to the fields of the struct
		if err != nil {
			log.Println("Error scanning row:", err)
			continue
		}
		fmt.Printf("ID: %d | Title: %s | Priority: %d | Complete: %v\n",
			task.ID, task.Title, task.Priority, task.Complete)
	}
}

func main() {
	initDB()
	// Ensure the database connection is closed when the program exits
	defer db.Close()
	// defer is used to ensure that the database connection is closed when the main function exits
	for {
		fmt.Println("Type 1 for Adding a Task")
		fmt.Println("Type 2 for Deleting a Task")
		fmt.Println("Type 3 for Marking a Task Complete")
		fmt.Println("Type 4 for Viewing all Tasks")
		fmt.Println("Type 5 for Exiting")

		var choice int
		fmt.Print("Enter your choice: ")
		fmt.Scan(&choice)

		switch choice {
		case 1:
			addTask()
		case 2:
			deleteTask()
		case 3:
			markComplete()
		case 4:
			view()
		case 5:
			fmt.Println("Exiting...")
			return
		default:
			fmt.Println("Invalid choice! Try again.")
		}
	}
}
