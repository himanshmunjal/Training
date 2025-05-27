package main

import (
	"fmt"
)

// type sms struct {
// 	id      string
// 	content string
// 	tags    []string
// }

// func tagMessages(messages []sms, tagger func(sms) []string) []sms {
// 	for i := range messages {
// 		messages[i].tags = tagger(messages[i])
// 	}
// 	return messages
// }

// func tagger(msg sms) []string {
// 	tags := []string{}

// 	lower := strings.ToLower(msg.content)

// 	if strings.Contains(lower, "urgernt") {
// 		tags = append(tags, "urgent")
// 	}

// 	if strings.Contains(lower, "sale") {
// 		tags = append(tags, "Promo")
// 	}

// 	return tags
// }

// func main() {
// 	msgs := []sms{
// 		{id: "1", content: "Limited-time SALE! Get discounts now."},
// 		{id: "2", content: "URGENT: Your package will be delivered today."},
// 		{id: "3", content: "Hello, hope you're having a great day!"},
// 	}
// 	tag := tagMessages(msgs, tagger)
// 	for _, k := range tag {
// 		fmt.Println(k.id, " ", k.tags, " ", k.content, " ")
// 	}
// }

// package main

// import (
// 	"fmt"
// 	"unicode"
// )

// func decode(pass string) bool {
// 	if len(pass) < 5 || len(pass) > 12 {
// 		return false
// 	}
// 	upp := false
// 	dig := false
// 	for _, k := range pass {
// 		if unicode.IsUpper(k) {
// 			upp = true
// 		}
// 		if unicode.IsDigit(k) {
// 			dig = true
// 		}
// 	}
// 	if upp && dig {
// 		return true
// 	}
// 	return false
// }

// func main() {
// 	pass1 := "Test"
// 	pass2 := "Testing4"
// 	pass3 := "Happy"
// 	pass4 := "Good_info"
// 	x1 := decode(pass1)
// 	x2 := decode(pass2)
// 	x3 := decode(pass3)
// 	x4 := decode(pass4)

// 	fmt.Println(x1)
// 	fmt.Println(x2)
// 	fmt.Println(x3)
// 	fmt.Println(x4)
// }
// package main

// import (
// 	"errors"
// 	"fmt"
// )

// const (
//     planFree = "free"
//     planPro  = "pro"
// )

// func getMessageWithRetriesForPlan(plan string, messages [3]string) ([]string, error) {
//     // switch plan {
//     // case planPro:
//     //     return messages[:], nil // Return all 3 messages
//     // case planFree:
//     //     return messages[:2], nil // Return first 2 messages
//     // default:
//     //     return nil, errors.New("unsupported plan") // Return an error for unknown plans
//     // }
// 	if(plan==planPro){
// 		return messages[:], nil
// 	}else if(plan==planFree){
// 		return messages[:2], nil
// 	}else{
// 		return nil, errors.New("unsupported plan")
// 	}
// }

// func main8() {
//     messages := [3]string{"Message 1", "Message 2", "Message 3"}

//     proMsgs, err := getMessageWithRetriesForPlan(planPro, messages)
//     if err != nil {
//         fmt.Println("Error:", err)
//     } else {
//         fmt.Println("Pro Plan Messages:", proMsgs)
//     }

//     freeMsgs, err := getMessageWithRetriesForPlan(planFree, messages)
//     if err != nil {
//         fmt.Println("Error:", err)
//     } else {
//         fmt.Println("Free Plan Messages:", freeMsgs)
//     }

//     invalidMsgs, err := getMessageWithRetriesForPlan("basic", messages)
//     if err != nil {
//         fmt.Println("Error:", err)
//     } else {
//         fmt.Println("Basic Plan Messages:", invalidMsgs)
//     }
// }

func getMessageWithRetries(primary, secondary, tertiary string) {
	sum := 0
	messages := []string{primary, secondary, tertiary}
	for j, _ := range messages {
		sum = sum + len(messages[j])
		fmt.Println(messages[j], " ", sum)
	}

}

func main() {
	getMessageWithRetries("Hello", "World", "!")
}
