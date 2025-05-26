package main

import "fmt"

func main4() {
	// a := map[string]int{"Germany": 1, "Norway": 2, "Switzerland": 3, "Finland": 4}

	// fmt.Printf("a: %v\n", a)

	// b := map[string]int{"One": 1, "Two": 2, "Three": 3, "Four": 4}
	// fmt.Printf("b: %v\n", b)
	// for k, v := range a {
	// 	fmt.Printf("%v : %v, ", k, v)
	// }

	m := make(map[string]int)
	m["price"] = 60
	m["id"] = 252
	delete(m, "product")
	fmt.Println(m)
}
