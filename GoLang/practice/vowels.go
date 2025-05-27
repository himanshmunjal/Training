//  Count number of vowels

package main

import (
	"fmt"
	"strings"
)

func countVowels(str string) int {
	vowels := "aeiouAEIOU"
	count := 0

	for _, char := range str {
		if strings.ContainsRune(vowels, char) {
			count++
		}
	}
	return count
}

func main() {
	input := "Hello, I am learning Go!"
	vowelCount := countVowels(input)
	fmt.Println("Number of vowels:", vowelCount)
}
