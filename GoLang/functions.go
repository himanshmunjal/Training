package main

import (
	"fmt"
)

func add(a, b int) int {
	return a + b
}

func mul(a, b int) int {
	return a * b
}

func res() (string, string, bool) {
	return "Himansh", "Munjal", true
}

func aggregate(a, b, c int, arit func(int, int) int) int {
	r1 := arit(a, b)
	r2 := arit(r1, c)
	return r2
}

func variadic(num ...int) int {
	max := 0
	for _, v := range num {
		if v > max {
			max = v
		} else {
			continue
		}
	}
	return max
}

func main7() {
	// sum := aggregate(1, 2, 3, add)
	// product := aggregate(2, 3, 4, mul)
	// fmt.Println(sum)
	// fmt.Println(product)
	// a, b, c := res()
	// fmt.Println(a, b, c)
	num := []int{34,22,67,90,43,12,45, 12, 11, 7, 57, 32,83}
	x := variadic(num...)
	fmt.Println(x)
}

// func yearsuntil(age int) (yearuntiladult, yearsuntildrink, yearsuntilmarriage int) {
// 	yearuntiladult = 18 - age
// 	if yearuntiladult < 0 {
// 		yearuntiladult = 0
// 	}
// 	yearsuntildrink = 21 - age
// 	if yearsuntildrink < 0 {
// 		yearsuntildrink = 0
// 	}
// 	yearsuntilmarriage = 25 - age
// 	if yearsuntilmarriage < 0 {
// 		yearsuntilmarriage = 0
// 	}
// 	return
// }

// func divide(dividend, divisor int) (int, error) {
// 	if divisor == 0 {
// 		return 0, errors.New("Can't be divide by 0")
// 	}
// 	return dividend / divisor, nil
// }

// func main() {
// var age int
// fmt.Printf("Enter your age: ")
// fmt.Scan(&age)

// yearsuntiladult, yearsuntildrink, yearsuntilmarriage := yearsuntil(age)
// fmt.Printf("Years to Adult: %v\nYears to Drink: %v\nYears to Marriage: %v\n", yearsuntiladult, yearsuntildrink, yearsuntilmarriage)

// 	var divisor, dividend int
// 	fmt.Printf("Enter dividend & divisor: ")
// 	fmt.Scan(&dividend, &divisor)

// 	remainder, err := divide(dividend, divisor)
// 	if err != nil {
// 		fmt.Println("Error:", err)
// 	} else {
// 		fmt.Println(remainder)
// 	}
// }
