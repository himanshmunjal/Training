// Find factors of a number

package main

import "fmt"

func factors(n int) []int {
	val := make([]int, 0)
	for i := 1; i <= n; i++ {
		if n%i == 0 {
			val = append(val, i)
		}
	}
	return val
}
func main() {
	y := 45
	val := factors(y)
	fmt.Println(val)
}
