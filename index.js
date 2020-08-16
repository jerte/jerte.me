const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var favicon = require('serve-favicon')

var app = express()

var nav = ['home', 'about', 'portfolio', 'contact']
var courses = ['Algorithms and Analysis', 'Artificial Intelligence',
                'Computer Organization', 'Data Structures', 'Differential Equations',
                'Foundation of Progamming', 'Internet Services and Protocols',
                'Linear Algebra for Application', 'Mentored Research',
                'Modern Web Progamming', 'Wireless and Mobile Communications']

var languages = ['Python', 'Javascript/NodeJS', 'Java', 'C++']
var os_s = ['MacOS Catalina', 'Linux (Ubuntu, Arch)']
var soft_skills = ['Communication', 'Work Ethic', 'Customer Service',
				   'Leadership', 'Teamwork', 'Initiative/Drive',
				   'Honesty', 'Accountability']
var interests = ['coding!', 'jiu jitsu', 'weightlifting', 'cooking',
				 'music', 'bitcoin']

app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist/')))
app.use(express.static(path.join(__dirname, '/node_modules/ejs/')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(favicon(path.join(__dirname, 'favicon/favicon.ico')))

app.get('/', (req,res) => { 
	res.render('pages/index', 
		{cur: 'home', nav: nav, courses: courses, languages: languages, 
		 os_s: os_s, soft_skills: soft_skills, interests: interests});
})

app.get('/home', (req, res) => { res.redirect('/')});

app.get('/about', (req,res) => { 
	res.render('pages/about', 
		{cur: 'about', nav: nav, courses: courses, languages: languages, 
		 os_s: os_s, soft_skills: soft_skills, interests: interests});
})
app.get('/portfolio', (req,res) => { 
	res.render('pages/portfolio', 
		{cur: 'portfolio', nav: nav, courses: courses, languages: languages, 
		 os_s: os_s, soft_skills: soft_skills, interests: interests});
})
app.get('/contact', (req,res) => { 
	res.render('pages/contact', 
		{cur: 'contact', nav: nav, courses: courses, languages: languages, 
		 os_s: os_s, soft_skills: soft_skills, interests: interests});
})


app.use(express.static(path.join(__dirname, 'static')))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
