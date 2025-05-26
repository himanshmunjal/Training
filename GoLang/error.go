package main

import (
	"errors"
	"fmt"
)

func name(names string) (string, error) {
	if names == "" {
		return "", errors.New("Empty String")
	}
	return names, nil
}

func main3() {
	name1 := ""
	msg, err := name(name1)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(msg)
	}
}
