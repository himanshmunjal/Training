package main

import (
    "fmt"
    "io"
    "log"
    "net/http"
)

func main() {
    url := "https://jsonplaceholder.typicode.com/todos/1"
    response, err := http.Get(url)

    if err != nil {
        log.Fatal(err)
    }
    defer response.Body.Close()

    var data string
    if response.StatusCode == http.StatusOK {
        bodyBytes, err := io.ReadAll(response.Body)
        if err != nil {
            log.Fatal(err)
        }
        data = string(bodyBytes) // Corrected `data` variable
    }

    fmt.Println(data)
}