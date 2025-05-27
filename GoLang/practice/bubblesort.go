package main

import "fmt"

func bubblesort(arr []int)[]int{
	for i:=0;i<len(arr)-1;i++{
		for j:=0;j<len(arr)-1;j++{
			if(arr[j]>arr[j+1]){
				arr[j], arr[j+1] = arr[j+1], arr[j]
			}
		}
	}
	return arr
}

func main(){
	arr:=[]int{34,1,45,44,57,41,84,32,23}
	res:=bubblesort(arr)
	fmt.Println(res)
}