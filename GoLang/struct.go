// package main

// import "fmt"

// type rect struct {
// 	len   int
// 	width int
// }

// // func area(r rect) int{
// // 	return r.len+r.width
// // }

// func (r rect) area() int {
// 	return r.len * r.width
// }

// func main() {
// 	// fmt.Println(area(rect{12,13}))
// 	r := rect{
// 		len:   12,
// 		width: 13,
// 	}
// 	fmt.Println(r.area())
// }

// // type employee struct {
// // 	id     int16
// // 	salary int32
// // 	role   string
// // 	info struct{
// // 		name      string
// // 		education string
// // 	 	age       int
// // 	}
// // }
// // type info struct {
// // 	name      string
// // 	education string
// // 	age       int
// // }

// // func print(e employee) {
// // 	fmt.Println("Employee Info")
// // 	fmt.Printf("->Name: %v\n->Age: %v\n->Education: %v\n", e.name, e.age, e.education)
// // 	fmt.Printf("->Employee id: %v\n->Employee salary: %v\n->Employee designation: %v\n", e.id, e.salary, e.role)
// // }

// // func main() {
// // 	print(employee{
// // 		id: 101, salary: 100000, role: "Marketing Head",
// // 		info: info{
// // 			name: "Raja", education: "MBA", age: 25,
// // 		},
// // 	})
// // }

package main

import "fmt"

type vechile interface {
	info() string
	cost() float64
}

type car struct {
	tax        float64
	base_price float64
	name       string
	company    string
}

type truck struct {
	tax        float64
	base_price float64
	name       string
	company    string
	duty       float64
}

func (c car) info() string {
	return fmt.Sprintf("Name: %v\nBrand: %v\n", c.name, c.company)
}

func (c car) cost() float64 {
	return (c.base_price * (1 + (c.tax / 100)))
}

func (t truck) info() string {
	return fmt.Sprintf("Name: %v\nBrand: %v\n", t.name, t.company)
}

func (t truck) cost() float64 {
	return t.base_price * (1 + (t.tax / 100) + (t.duty / 100))
}

func print(s vechile) {
	fmt.Println(s.info())
	fmt.Printf("Total Cost: %.2f\n", s.cost())
}

func main1() {
	c := car{name: "Velar", company: "Range Rover", base_price: 9000000, tax: 18}
	t := truck{name: "New", company: "Eicher", base_price: 3700000, tax: 18, duty: 5}
	fmt.Println("Car Details")
	print(c)
	fmt.Println("Truck Details")
	print(t)
}
