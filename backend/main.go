package main

import (
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	fileServer := http.FileServer(http.Dir("./src/public"))
	mux.Handle("/public/", http.StripPrefix("/public", fileServer))

	staticServer := http.FileServer(http.Dir("./src/static"))
	mux.Handle("/static/", http.StripPrefix("/static", staticServer))

	mux.HandleFunc("/", home)

	log.Println("Starting server on http://localhost:4040/")

	err := http.ListenAndServe("localhost:4040", mux)
	log.Fatal(err)
}
