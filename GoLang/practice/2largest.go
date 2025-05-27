package main

import "fmt"

func largest(arr[]int, size int, l *int, s *int){
  for i:=0;i<size;i++{
    if *l<arr[i]{
      *l=arr[i]
    }

    if *s>arr[i]{
      *s=arr[i]
    }
  }
}

func main(){
  slc:=[]int{5,3,8,3,0,8,39,56,31}
  n:=len(slc);

  l:=slc[0]
  s:=slc[0]

  largest(slc,n,&l,&s)

  slar:=0
  for i:=0;i<n;i++{
    if (slar<slc[i]){
      if(slc[i]==l){
        continue
      }else{
      slar=slc[i]
        }
    }
  }
  fmt.Println("The slice - ",slc)
  fmt.Printf("\nThe largest and the smallest are: %d, %d",l,s)
  fmt.Printf("\nThe 2nd largest element: %d",slar);
}