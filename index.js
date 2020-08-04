const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var favicon = require('serve-favicon')

var app = express()

var courses = ['Algorithms and Analysis', 'Artificial Intelligence',
                'Data Stuctures', 'Computer Organization',
                'Foundation of Progamming', 'Internet Services and Protocols',
                'Linear Algerba for Application', 'Mentored Research',
                'Modern Web Progamming', 'Wireless and Mobile Communications']

var languages = ['Python', 'Javascript/NodeJS', 'Java', 'C']
var os_s = ['MacOS Catalina', 'Unix/Linux (Ubuntu, Arch)']
var soft_skills = ['Communication/Customer Service', 'Work Ethic',
				   'Leadership/Teamwork', 'Initiative/Drive',
				   'Honesty/Accountability']
var interests = ['coding!', 'jiu jitsu', 'weightlifting', 'cooking',
				 'music', 'bitcoin']

app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist/')))
app.use(express.static(path.join(__dirname, '/node_modules/ejs/')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(favicon(path.join(__dirname, 'favicon/favicon.ico')))
app.get('/', (req,res) => { 
	res.render('pages/index', 
		{courses: courses, languages: languages, 
		 os_s: os_s, soft_skills: soft_skills, interests: interests});
})

app.use(express.static(path.join(__dirname, 'static')))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
