package main

import "fmt"

func factorial(x int) int {
	if x == 0 || x == 1 {
		return 1
	}
	return x * factorial(x-1)
}

func main5() {
	ans := factorial(6)
	fmt.Println(ans)
	val := []string{"Himansh", "Atharv", "Gaurav", "Dhairya", "Ayushman"}

	for i := range len(val) {
		fmt.Println(val[i])
	}

	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	for j := range len(matrix[0]) {
		for k := range len(matrix) {
			fmt.Printf("%v  ", matrix[j][k])
		}
		fmt.Println()
	}
	fmt.Println(matrix)
}
