package main

import (
	"fmt"
)

func print1(res chan int) {
	for num := range res {
		fmt.Println("Processing number", num)
	}
}

func sum(result chan int, num1 int, num2 int) {
	add := num1 + num2
	result <- add
}

func test(done chan bool){
	defer func(){
		done <- true
	}()
	fmt.Println("Processing...")
}

// func main() {

	// done:=make(chan bool)

	// go test(done)

	// <-done

	// mescha := make(chan int)

	// go sum(mescha, 5, 6)

	// res := <-mescha

	// fmt.Println(res)

// }

// go print1(mescha)

// for i := 0; i <= rand.Intn(100); i++ {
// 	mescha <- i
// }
// mescha <- "New String" //blocking

// print := <-mescha

// fmt.Println(print)
// }