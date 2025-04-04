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
	Image        string
	Video        string
}

var work = []Work{
	{

		Company:     "Yazaki North America",
		Role:        "Software Engineer Intern",
		Department:  "Stellantis BU",
		Description: "In my last internship, I dove heavily into manipulating and displaying data pertaining to both products and engineering. I created 6 macros, saving hundreds of hours of work in total, in three seperate divisions within the business unit. In the ever increasing automotive crunch, this allows engineers to focus on creating better end products. I was also lucky to expand beyond the walls of Stellantis and create a web application that was used in a fellow intern teams demo to upper management.",
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
	{

		Company:     "Yazaki North America",
		Role:        "Software Engineer Intern",
		Department:  "GM BU",
		Description: "For my second internship, I was focused on two products: a JSON DLL for Siemens ModularXC, and an all inclusive macro, a rewrite of a previous macro but in C# for better performance. I was able to explore the C# ecosystem for the first time, and build the groundwork for a sustainable solution. This is the first time I dealt with requirements and timelines, and I gained considerable experiences in both my successes and failures.",
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
		Department:  "EI Software BU",
		Description: "In my first internship, I worked alongside 3 other interns in a Scrum team within the EI Software department. This was my first introduction to Scrum, as well as working in a professional environment -- the closest I got until then was commercial cleaning in an office building. I was able to prove the use case of Python for the head of the department by building a Python app plus a GUI to interface with PTC Integrity, a version control manager. I also helped bring back the asset control project, where I dove into the data analysis lifecycle for the first time: compiling and cleaning data.",
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
		Link:  "https://github.com/digitaldisarray/CTFCollab",
		Image: "/static/img/projects/ctf-collab/ctf-collab-home.png",
		Video: "/static/img/projects/ctf-collab/ctf-collab-demo.mp4",
	},
	{
		Name:        "This Portfolio",
		Description: "Created and designed to showcase my abilities and experience. Utilizes Three.js and GLSL shaders, as well as Go templates. The holographic shader was adapted from a final project in my shaders class.",
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
		Link:  "https://github.com/brayden-aldrich/picnic-defender",
		Image: "/static/img/projects/picnic-defenders/picnic-defenders-home.png",
		Video: "/static/img/projects/picnic-defenders/picnic-defenders-demo.mp4",
	},
	{
		Name:        "Mastermind MASM",
		Description: "Mastermind created in Microsoft Macro Assembler (MASM). I was responsible for programming user interaction via key commands, setting the ui response, and game state flow. ",
		Company:     "Oregon State University",
		Technologies: []string{
			"MASM",
		},
		Link:  "https://github.com/brayden-aldrich/Mastermind-Assembly",
		Image: "/static/img/projects/mastermind.png",
		Video: "",
	},
	{
		Name:        "Treasure Hunt",
		Description: "Mobile treasure hunt game where the user must decipher clues to find the location hinted at. Features 3 locations around Corvallis, Oregon.",
		Company:     "Oregon State University",
		Technologies: []string{
			"Jetpack Compose",
			"Kotlin",
			"Android Services",
		},
		Link:  "",
		Image: "/static/img/projects/treasure-hunt/treasure-hunt.png",
		Video: "/static/img/projects/treasure-hunt/treasure-hunt-demo.mp4",
	},
	{
		Name:        "smallsh",
		Description: "Bash shell implementation written in C in just 252 lines! Handles forks, redirects, comments, $$, exit, cd, status, and exec. Also detects SIGINT and SIGSTP signals. ",
		Company:     "Oregon State University",
		Technologies: []string{
			"C",
			"Bash",
		},
		Link:  "https://github.com/brayden-aldrich/smallsh",
		Image: "",
		Video: "",
	},
	{
		Name:        "User Permissions Matrix",
		Description: "Application written to find a users permissions within PTC Integrity for the EI Software Department.",
		Company:     "Yazaki North America",
		Technologies: []string{
			"Python",
			"TKinter",
			"PTC Integrity",
		},
		Link:  "",
		Image: "",
		Video: "",
	},
	{
		Name:        "Load Calculator",
		Description: "Web app to help with the R & D intern team's project demo. Will show the users battery use per appliance, and determine the appropriate package on a speed-o-meter like animation.",
		Company:     "Yazaki North America",
		Technologies: []string{
			"Javascript",
			"CSS",
			"HTML",
		},
		Link:  "",
		Image: "/static/img/projects/makerspace.png",
		Video: "",
	},
}

var funcMap = template.FuncMap{
	"increment": func(x int) int {
		return x + 1
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

	ts, err := template.New("base.html").Funcs(funcMap).ParseFiles(files...)
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
