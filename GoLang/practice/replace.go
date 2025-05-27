// replacing an element in slice
package main

import "fmt"

func main() {
	var len, ele, loc int

	fmt.Printf("Enter the length: ")
	fmt.Scanf("%d %d", &len)

	arr := make([]int, len)

	fmt.Printf("\nEnter the elements: ")
	for i := 0; i < len; i++ {
		fmt.Scanf("%d", &arr[i])
	}

	fmt.Printf("\nEnter the location and element(0-%d): ", len-1)
	fmt.Scanf("%d %d", &loc, &ele)

	if loc > len || loc < 0 {
		fmt.Println("\nInvalid Input!")
	} else {
		fmt.Println(arr[loc], " has been successfully replaced by ", ele, "!")
		arr[loc] = ele
	}

	fmt.Printf("\nThe slice after replacement are: ")
	for i := 0; i < len; i++ {
		fmt.Printf("%d, ", arr[i])
	}
	fmt.Println()
}
