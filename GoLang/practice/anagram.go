// If the string is anagram or not

package main

import "fmt"

func bubblesort(str []byte) {
	for i := 0; i < len(str)-1; i++ {
		for j := 0; j < len(str)-1; j++ {
			if str[j] > str[j+1] {
				temp := str[j]
				str[j] = str[j+1]
				str[j+1] = temp
			}
		}
	}
}

func anagram(str1, str2 string) bool {
	n1 := len(str1)
	n2 := len(str2)

	if n1 != n2 {
		return false
	}
	s1 := []byte(str1)
	s2 := []byte(str2)
	bubblesort(s1)
	bubblesort(s2)
	return string(s1) == string(s2)
}

func main() {
	s1 := "geeks"
	s2 := "ksege"
	// ans := anagram(s1, s2)
	if anagram(s1, s2) {
		fmt.Println("Strings are Anagram")
	} else {
		fmt.Println("Strings are not anagram")
	}
}
