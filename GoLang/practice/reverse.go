// Reversing an array

package main

import "fmt"

func reverse(arr []int) []int {
	n := len(arr)
	for i := 0; i < n/2; i++ {
		temp := arr[i]
		arr[i] = arr[n-i-1]
		arr[n-i-1] = temp
	}
	return arr
}

func main() {
	arr1 := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	res := reverse(arr1)
	fmt.Println(res)
}
