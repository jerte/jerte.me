const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
	.use(express.static(path.join(__dirname, 'style_n_scripts')))
	.use(express.static(path.join(__dirname, '/node_modules/jquery/dist/')))
	.use(express.static(path.join(__dirname, 'views/partials')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req,res) => res.render('pages/index'))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))
