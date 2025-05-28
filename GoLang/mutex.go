package main

import (
	"fmt"
	"sync"
)

type post struct {
	view int
	mu   sync.Mutex
}

func (p *post) inc(wg *sync.WaitGroup) {
	defer wg.Done()

	p.mu.Lock()
	p.view += 1
	p.mu.Unlock()
}

func main() {
	myPost := post{view: 0}
	var wg sync.WaitGroup
	for i := 0; i <= 100; i++ {
		wg.Add(1)
		go myPost.inc(&wg)
	}
	wg.Wait()
	fmt.Println(myPost.view)
}
