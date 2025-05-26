// package main

// import (
// 	"fmt"
// )

// func point(name string) {
// 	name = "Rahul"
// 	fmt.Println("Name of the Person:", name)
// }

// type Analytics struct {
// 	MessageTotal    int
// 	MessageFailed   int
// 	MessageSucceded int
// }

// type Message struct {
// 	Recipient string
// 	Success   bool
// }

// func getMessageText(a *Analytics, m Message) {
// 	a.MessageTotal++
// 	if m.Success {
// 		a.MessageSucceded++
// 	} else {
// 		a.MessageFailed++
// 	}
// }

// func main() {
// 	analysis := Analytics{}

// 	msg := []Message{
// 		{"Rahul", true},
// 		{"Ajay", false},
// 		{"Pooja", true},
// 		{"Khushi", false},
// 	}

// 	for _, m := range msg {
// 		getMessageText(&analysis, m)
// 	}
// 	fmt.Println("Total:", analysis.MessageTotal)
// 	fmt.Println("Failed Message:", analysis.MessageFailed)
// 	fmt.Println("Succeded Message:", analysis.MessageSucceded)
// 	// name := "Himansh"
// 	// point(name)
// 	// fmt.Println("Changed name is:", &name)
// 	// x := 5
// 	// ptr := &x
// 	// y := *ptr
// 	// fmt.Println(x)
// 	// fmt.Println(ptr)
// 	// fmt.Println(y)
// }

package main

import (
	"errors"
	"fmt"
)

type customer struct {
	id      int
	balance float64
}

type transactionType string

type transaction struct {
	customerId      int
	amount          float64
	transactionType transactionType
}

const (
	transactionDeposit    transactionType = "deposit"
	transactionWithdrawal transactionType = "withdrawal"
)

func updateBalance(cust *customer, t transaction) (customer, error) {
	if t.transactionType != transactionDeposit && t.transactionType != transactionWithdrawal {
		return *cust, errors.New("Unkonown Transaction Type")
	}
	if t.transactionType == transactionWithdrawal {
		if cust.balance < t.amount {
			return *cust, errors.New("Balance less than withdrawal amount")
		} else {
			cust.balance = cust.balance - t.amount
		}
		return *cust, nil
	}
	if t.transactionType == transactionDeposit {
		cust.balance += t.amount
		return *cust, nil
	}
	return *cust, nil
}

func main() {
	c := customer{1, 450}
	trans1 := transaction{1, 3400, transactionDeposit}
	trans2 := transaction{1, 3900, transactionWithdrawal}
	trans3 := transaction{1, 3200, "Mai kyun btaun ?"}
	trans4 := transaction{1, 3700, transactionWithdrawal}

	fmt.Println(c.balance)
	c, err := updateBalance(&c, trans1)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(c.id, " ", c.balance)
	}
	c, err2 := updateBalance(&c, trans2)
	if err2 != nil {
		fmt.Println(err2)
	} else {
		fmt.Println(c.id, " ", c.balance)
	}
	c, err3 := updateBalance(&c, trans3)
	if err3 != nil {
		fmt.Println(err3)
	} else {
		fmt.Println(c.id, " ", c.balance)
	}
	c, err4 := updateBalance(&c, trans4)
	if err4 != nil {
		fmt.Println(err4)
	} else {
		fmt.Println(c.id, " ", c.balance)
	}
}
