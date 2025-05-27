// Check for armstrong number

package main

import (
	"fmt"
	"math"
)

func armstrong(num int) {
	a := num
	sum := 0
	b := len(fmt.Sprintf("%d", num))
	for a > 0 {
		c := a % 10
		sum = sum + int(math.Pow(float64(c), float64(b)))
		a = a / 10
	}
	if sum == num {
		fmt.Println(num, " is a Armstrong number")
	} else {
		fmt.Println(num, " is not a Armstrong number")
	}
}
func main() {
	n1 := 153
	n2 := 176
	armstrong(n1)
	armstrong(n2)
}