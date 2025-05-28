package main

import (
	"fmt"
	"sync"
)

func group(id int, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Printf("Done printing %v\n", id)
}

func main() {
	var wg sync.WaitGroup
	for i := 0; i <= 10; i++ {
		wg.Add(1)
		group(i, &wg)
	}
	wg.Wait()
	fmt.Println("Program executed completely")
}
