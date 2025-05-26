package main

import "fmt"

func main_data() {
	xy := "Hello string"
	var z string = "This is a string"
	fmt.Println(xy)
	fmt.Println(z)
	var x1 = "New"
	var x2 = "String"

	fmt.Print(x1 + " " + x2)

	i := 12
	j := 13
	fmt.Printf("i = %v & j = %v\n", i, j)

	fmt.Printf("i = %#v, j = %#v\n", i, j)

	fmt.Printf("i = %v, j = %v\n", i, j)

	debugMsg := fmt.Sprintf("i = %v, j = %v", i, j)
	fmt.Println(debugMsg)

	x := 64.678
	y := int(x)
	fmt.Println(y)
}
