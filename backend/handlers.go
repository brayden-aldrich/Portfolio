package main

import (
	"log"
	"net/http"
	"text/template"
)

type Work struct {
	Company      string
	Role         string
	Department   string
	Description  string
	Date         string
	Link         string
	Achievements []string
	Technologies []string
}

var work = []Work{
	{
		Company:     "Yazaki North America",
		Role:        "Software Engineer Intern",
		Department:  "EI Software BU",
		Description: "Worked in a Scrum team with other interns to create apps and process improvements for the business unit.",
		Date:        "June 2022 - September 2022",
		Achievements: []string{
			"Proved Pythons use case by creating an application to interface with PTC Integrity",
			"Revived the asset management project and compiled all asset sources into a proven data type within PTC Integrity",
		},
		Technologies: []string{
			"Python",
			"Excel",
			"PTC Integrity",
		},
		Link: "https://www.yazaki-na.com/",
	},
	{

		Company:     "Yazaki North America",
		Role:        "Software Engineer Intern",
		Department:  "GM BU",
		Description: "Worked alongside an engineering team to build an Excel plugin and a DLL for engineering efficiency.",
		Date:        "June 2023 - September 2023",
		Achievements: []string{
			"Created an Excel plugin and DLL using C#, having never used the language before.",
			"Won the “Intern Process Improvement” challenge with an idea to expedite the testing and validation process for parts.",
		},
		Technologies: []string{
			"C#",
			"Excel",
		},
		Link: "https://www.yazaki-na.com/",
	},
	{

		Company:     "Yazaki North America",
		Role:        "Software Engineer Intern",
		Department:  "Stellantis BU",
		Description: "Automation engineer creating plugins and macros to improve efficiency and workflow of wiring harness engineering.",
		Date:        "June 2024 - September 2024",
		Achievements: []string{
			"Created six sustainable macros that will save dozens of hours of work, having never coded in VBA before.",
			"Created a Load Calculator web application for the R & D Intern teams project showcase, with all animations and functionalities written in vanilla JavaScript.",
		},
		Technologies: []string{
			"Visual Basic",
			"Excel",
			"Javascript",
			"CSS",
			"HTML",
		},
		Link: "https://www.yazaki-na.com/",
	},
}

func home(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	files := []string{
		"./src/static/html/pages/base.html",
	}

	ts, err := template.ParseFiles(files...)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	err = ts.ExecuteTemplate(w, "base", work)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}

}
