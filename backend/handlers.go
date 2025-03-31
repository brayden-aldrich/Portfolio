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

type Project struct {
	Name         string
	Description  string
	Company      string
	Technologies []string
	Link         string
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

var projects = []Project{

	{
		Name:        "Collaborative Note Taking App",
		Description: "Capstone project created for Oregon State's security club. Real-time document editing, document publishing, and challenge tracking for CTF competitions. FOSS and self-hostable on low-end hardware.",
		Company:     "Oregon State University",
		Technologies: []string{
			"Go",
			"MySQL",
			"SQLC",
			"TypeScript",
			"SvelteKit",
			"Tailwind",
			"Docker",
		},
		Link: "https://github.com/digitaldisarray/CTFCollab",
	},
	{
		Name:        "This Portfolio",
		Description: "Created and designed to showcase my abilities and experience. Utilizes Three.js and GLSL shaders, as well as Go templates.",
		Company:     "Personal",
		Technologies: []string{
			"Go",
			"Three.js",
			"GLSL",
		},
		Link: "",
	},
	{
		Name:        "Picnic Defenders",
		Description: "Simple game where users needs to swat bugs before they reach the picnic. Our professor added it to his \"Hall of Fame\" site, which showcases the best final projects each semester.",
		Company:     "Oregon State University",
		Technologies: []string{
			"Javascript",
			"CSS",
			"Node.js",
		},
		Link: "https://github.com/brayden-aldrich/picnic-defender",
	},
	{
		Name:        "Mastermind MASM",
		Description: "Mastermind created in Microsoft Macro Assembler (MASM)",
		Company:     "Oregon State University",
		Technologies: []string{
			"MASM",
		},
		Link: "https://github.com/brayden-aldrich/Mastermind-Assembly",
	},
	{
		Name:        "smallsh",
		Description: "Bash shell implementation written in C in just 252 lines!",
		Company:     "Oregon State University",
		Technologies: []string{
			"C",
			"Bash",
		},
		Link: "https://github.com/brayden-aldrich/smallsh/blob/master/smallsh.c",
	},
	{
		Name:        "User Permissions Matrix",
		Description: "Application written to find a users permissions within PTC Integrity for the EI Software Department.",
		Company:     "Yazaki NA",
		Technologies: []string{
			"Python",
			"TKinter",
			"PTC Integrity",
		},
		Link: "",
	},
	{
		Name:        "Load Calculator",
		Description: "Web app to help with the R & D intern team's project demo. Will show the users battery use per appliance, and determine the appropriate package on a speed-o-meter like animation.",
		Company:     "Yazaki NA",
		Technologies: []string{
			"Javascript",
			"CSS",
			"HTML",
		},
		Link: "",
	},
}

func home(w http.ResponseWriter, r *http.Request) {

	psSet := make(map[string]bool)
	pcString := []string{}
	for i := 0; i < len(projects); i++ {
		ps := psSet[projects[i].Company]
		if !ps {
			pcString = append(pcString, projects[i].Company)
			psSet[projects[i].Company] = true
		}
	}
	wsSet := make(map[string]bool)
	wcString := []string{}
	for i := 0; i < len(work); i++ {
		ws := wsSet[work[i].Company]
		if !ws {
			wcString = append(wcString, work[i].Company)
			wsSet[work[i].Company] = true
		}
	}
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

	err = ts.ExecuteTemplate(w, "base", map[string]interface{}{
		"Work":             work,
		"Projects":         projects,
		"ProjectCompanies": pcString,
		"WorkCompanies":    wcString,
	})

	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}

}
