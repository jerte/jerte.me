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

app.get('/:page?/:subpage?', async (req, res) => {

	var data = {};

	try {
		const client = await pool.connect();
		const pages = await client.query('SELECT * FROM PAGES');
		
		console.log(pages.rows);

		if(!req.params.page) {
			req.params.page = "home";
		}
		
		
		var page_index = pages.rows.map(x => x['name'] ).indexOf(req.params.page);	
		if(page_index >= 0) {
		
			for (var d_req of pages.rows[page_index]['data_req'].split(" ") ) {
				const q = await client.query(
						  'select * from site_data where site_id=' + 
						  '(select id from site_data_names where name=\'' + d_req + '\')');
				data[d_req] = q.rows;
			}
		
			res.render('pages/base', 
				{ page: req.params.page, subpage: req.params.subpage, data: data });
		} else {
			res.render('pages/404');
		}
		client.release();

	} catch (err) {
		res.send(err.message);
	}
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
