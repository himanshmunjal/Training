package main

import "fmt"

func main2() {
	// for i := 1; i <= 10; i++ {
	// 	fmt.Printf("%v * %v = %v\n", 7, i, 7*i)
	// }
	// j := 1
	// for j <= 10 {
	// 	fmt.Println(7, "*", j, " = ", 7*j)
	// 	j++
	// }

	// arr := []int{5,6,7,8,9,10}

	// for k := range 10 {
	// 	fmt.Println(7, "*", k, " = ", 7*k)
	// }
	// sum:=0
	// for _,v := range arr{
	// 	sum = sum + v
	// }
	// fmt.Println(sum)

	for i, c := range "Himansh" {
		fmt.Println(i, string(c))
	}

}
