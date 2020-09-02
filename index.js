const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
var favicon = require('serve-favicon');
const { Pool } = require('pg');

var admin_active = false;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
})

var app = express();

app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.use(express.static(path.join(__dirname, '/node_modules/ejs/')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'favicon/favicon.ico')));
app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

app.post('/admin/add-interest', async (req, res) => {
	if(admin_active) {
		try {
			const client = await pool.connect();
			client.query('INSERT INTO data VALUES (\'' + req.body.interest + '\', 5, 0)' );
			client.release();
			res.end("yes");
		} catch (err) {
			console.log(err);
		}
	}
});

app.post('/admin/add-interest-topic', async (req, res) => {
	if(admin_active) {
		try {
			const client = await pool.connect();
			// x topic id becomes id of coding_topics, need query beforehand
			//client.query('INSERT INTO data VALUES (\'' + req.body.topic '\', x_topic_id, 0)' );
			client.release();
		} catch(err) {
			console.log("Error: " + err);
			res.send("Error: " + err);
		}
	}
});

app.get('/data/interest-topics/:topic', async (req, res) => {
	try {
		const client = await pool.connect();
		const q = await client.query('select * from data where has_link=' + 
			'(select id from data where name=\'' + req.params.topic + '\')');
		console.log(q.rows);
		res.send(q.rows);
		
	} catch (err) {
		
		res.send("Error: " + err);
	}
	
});

app.get('/home', (req, res) => { res.redirect('/')});

app.get('/:page?/:subpage?', async (req, res) => {

	var data = {};

	try {
		const client = await pool.connect();
		const pages = await client.query('SELECT * FROM PAGES');
		
		if(!req.params.page) {
			req.params.page = "home";
		}
		
		
		var page_index = pages.rows.map(x => x['name'] ).indexOf(req.params.page);	
		var subpage_index = pages.rows.map(x => x['name']).indexOf(req.params.page + '/' + req.params.subpage);

		if(page_index >= 0) {
		
			for (var d_req of pages.rows[page_index]['data_req'].split(" ") ) {
				const q = await client.query(
						  'select * from data where name_id=' + 
						  '(select id from data_names where name=\'' + d_req + '\')');
				data[d_req] = q.rows;
			}
			if(subpage_index >= 0) {
				for( var d_req of pages.rows[subpage_index]['data_req'].split(" ") ) {
					const q = await client.query(
						'select * from data where name_id=' +
						'(select id from data_names where name=\'' + d_req + '\')');
					data[d_req] = q.rows;
				}
			}
			
			res.render('pages/base', 
				{ page: req.params.page, subpage: req.params.subpage, data: data, admin: admin_active });
		} else {
			res.render('pages/404');
		}
		client.release();

	} catch (err) {
		res.send(err.message);
	}
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
