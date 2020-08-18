const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var favicon = require('serve-favicon')
const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
})

var app = express()

app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist/')))
app.use(express.static(path.join(__dirname, '/node_modules/ejs/')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(favicon(path.join(__dirname, 'favicon/favicon.ico')))
app.use(express.static(path.join(__dirname, 'static')))

app.get('/home', (req, res) => { res.redirect('/')});

app.get('/:page?', async (req, res) => {
	try {
		const client = await pool.connect();
		const site_data_names = await client.query('SELECT * FROM site_data_names');
		
		var site_data_ids = {};
		for(var i=0; i < site_data_names.rows.length; i++) {
			site_data_ids[site_data_names.rows[i]['name']] = site_data_names.rows[i]['id'];
		}

		var query_results = {};
		for(var key in site_data_ids) {
			const query_ = await client.query('SELECT * FROM site_data WHERE SITE_ID=' + 
							 site_data_ids[key]);
			query_results[key] = query_.rows.map(x => x['name']);
		}
		
		if(!req.params.page) {
			req.params.page = "home";
		}
		res.render('pages/base', { cur: req.params['page'], nav: query_results['pages'], 
								   courses: query_results['courses'], languages: query_results['languages'],
								   os_s: query_results['os'], soft_skills: query_results['soft skills'],
								   interests: query_results['interests']});
		client.release();

	} catch (err) {
		res.send("Sorry, an error occured. Try again in a few moments.");
	}
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
