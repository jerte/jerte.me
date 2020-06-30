const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var favicon = require('serve-favicon')

var app = express()

app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist/')))
app.use(express.static(path.join(__dirname, '/node_modules/ejs/')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(favicon(path.join(__dirname, 'favicon/favicon.ico')))
app.get('/', (req,res) => res.render('pages/index'))
app.get('/page.json', function(req,res) {
	res.sendFile('page.json', {root : __dirname});
})

app.use(express.static(path.join(__dirname, 'static')))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
