package main

import (
	"fmt"
	"slices"
)

func main6() {
	// val := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15}
	// nums := make([]int, 0, 10)
	// nums = append(nums, 3)
	// nums = append(nums, 4)
	// nums = append(nums, 5)
	// nums = append(nums, 6)
	// nums = append(nums, 7)
	// nums = append(nums, 8)
	// num := make([]int, 5)
	// needed := val[:len(val)-10]
	// copy(num, needed)
	// fmt.Println(nums)
	// fmt.Println(num)

	val1 := []int{1, 2, 3}
	val2 := []int{1, 2, 3}

	fmt.Println(slices.Equal(val1, val2))
}
