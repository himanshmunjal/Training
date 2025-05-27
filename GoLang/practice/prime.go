// Find if a number is prime or not

package main

import "fmt"

func prime(n int) bool {
	prime := false
	if n == 1 || n == 0 {
		prime = false
	}
	for i := 2; i < n; i++ {
		if n%i == 0 {
			prime = true
			return prime
		} else {
			continue
		}
	}
	return prime
}
func main() {
	var num1, num2 int
	fmt.Scan(&num1, &num2)
	val1 := prime(num1)
	val2 := prime(num2)
	if val1 {
		fmt.Printf("%v is a Prime Number.\n", num1)
	} else {
		fmt.Printf("%v is not a Prime Number.\n", num1)
	}
	if val2 {
		fmt.Printf("%v is a Prime Number.\n", num2)
	} else {
		fmt.Printf("%v is not a Prime Number.\n", num2)
	}
}
