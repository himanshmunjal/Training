// Checking if a string is palindrome

package main

import (
	"fmt"
	"strings"
)

func palindrome(name string) int {
	leng := len(name)
	name = strings.ToLower(name)
	count := 0
	for i := 0; i < leng/2; i++ {
		if name[i] != name[leng-i-1] {
			count++
		}
	}
	return count
}

func main() {
	var name string
	fmt.Printf("Enter the String: ")
	fmt.Scan(&name)
	count := palindrome(name)
	if count == 0 {
		fmt.Printf("%v is a Palindrome\n", name)
	} else {
		fmt.Printf("%v is not a Palindrome\n", name)
	}
}