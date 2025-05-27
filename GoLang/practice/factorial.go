// Find factorial for a number

package main

import "fmt"

func factorial(n int) int {
	if n == 0 || n == 1 {
		return 1
	}
	fact := 1
	for i := 1; i <= n; i++ {
		fact = fact * i
	}
	return fact
}

func main() {
	x := 6
	res := factorial(x)
	fmt.Println(res)
}