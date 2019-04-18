var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();

/* Variaveis de configuração. */
const PORT = 3000;

const NOTICIA = 1;
const ENTIDADE = 2;

const SECRET = 'dev';

/* Inicia a conexão com o Banco de Dados */
var pool	= mysql.createPool({
	connectionLimit : 2,
	host: "localhost",
	user: "root",
	password: "dev01",
	database: "livraria_cedoc_fac"
});

/* Handlers para os requests */
app.get('/', (req, res) => {
	res.send('Hello World!')
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/timeline', (req, res) => {
	getTimeline().then((timeline) => {
		getNoticias().then((noticias) => {
			getEntidades().then((entidades) => {
				res.json(joinResult(timeline, noticias, entidades));
				console.log(timestamp()+"Response enviada.");
			});
		});
	}).catch((err) => {
		console.log(err);
		res.send();
	});
});

app.get('/noticia', (req, res) => {
	if(req.query.pk != null){
		getNoticia(req.query.pk).then((noticia) => {
			res.json(noticia);
		}).catch((err) => {
			console.log(err);
		});
	} else {
		res.send();
	}
});

app.get('/entidade', (req, res) => {
	if(req.query.pk != null){
		getEntidade(req.query.pk).then((entidade) => {
			res.json(entidade);
			console.log(timestamp()+"Response enviada.");
		}).catch((err) => {
			res.send();
			console.log(err);
		});
	} else if(req.query.categoria != null){
		getEntidadePorCategoria(req.query.categoria).then((entidade) => {
			res.json(entidade);
			console.log(timestamp()+"Response enviada.");
		}).catch((err) => {
			res.send();
			console.log(err);
		});
	} else {
		getEntidades().then((entidades) => {
			res.json(entidades);
			console.log(timestamp()+"Response enviada.");
		}).catch((err) => {
			res.send();
			console.log(err);
		});
	}
});

app.get('/categoria', (req, res) => {
	if(req.query.pk != null){
		getCategoria(req.query.pk).then((categoria) => {
			res.json(categoria);
			console.log(timestamp()+"Response enviada.");
		}).catch((err) => {
			res.send();
			console.log(err);
		});
	} else {
		getCategorias().then((categorias) => {
			getEntidades().then((entidades) => {
				res.json(joinCategoria(categorias, entidades));
				console.log(timestamp()+"Response enviada.");
			})
		}).catch((err) => {
			res.send();
			console.log(err);
		});
	}
});

app.post('/auth', (req, res) => {
	auth(req.body.email, req.body.senha).then((usuarioAutenticado) => {
		if(!isEmpty(usuarioAutenticado)){
			let resData = {
				Auth : jwt.sign(JSON.stringify(usuarioAutenticado), SECRET)
			};
			res.status(200).json(resData);
		} else {
			res.sendStatus(403);
		}
	});
});

app.post('/user', (req, res) => {
	try {
      var token = jwt.verify(req.body.token, SECRET);
	  res.status(200).json(token);
    } catch (ex) {
      return res.status(403).send('Authorization Error');
    }
});

/* Inicia o servidor */
app.listen(PORT, () => {
	console.log("Servidor rodando na porta "+PORT+".");
});

/**
 *	--------------------------------------------------------
 *		Functions para recuperar dados do Banco de Dados.
 *	--------------------------------------------------------
 */
 
function auth(email, senha) {
	return new Promise(function (resolve, reject) {
		const SQL = "SELECT * FROM liv_usuario where c_email = '"+email+"' and c_senha = '"+senha+"'";
		pool.query(SQL, (err, rows, fields) => {
			if (err) reject(err);
			resolve(rows);
		});
	})
}
 
function getTimeline () {
	return new Promise(function (resolve, reject) {
		const SQL = "SELECT * FROM liv_timeline";
		pool.query(SQL, (err, rows, fields) => {
			if (err) reject(err);
			resolve(rows);
		});
	})
}

function getNoticia (pk) {
	return new Promise(function (resolve, reject) {
		const SQL = "SELECT * FROM liv_noticia WHERE n_pknoticia = "+pk;
		pool.query(SQL, (err, rows, fields) => {
			if (err) reject(err);
			resolve(rows);
		});
	})
}

function getNoticias () {
	return new Promise(function (resolve, reject) {
		const SQL = "SELECT * FROM liv_noticia";
		pool.query(SQL, (err, rows, fields) => {
			if (err) reject(err);
			resolve(rows);
		});
	})
}

function getEntidade (pk) {
	return new Promise(function (resolve, reject) {
		const SQL = "SELECT n_pkent, n_pktipo, c_nome, c_autor, DATE_FORMAT(d_publi, \"%M %d, %Y\") as d_publi, n_datapost, c_info, c_displocal, c_dispebook, c_linkdown, n_curtidas, c_thumbnail, c_categoria FROM liv_ent WHERE n_pkent = "+pk;
		pool.query(SQL, (err, rows, fields) => {
			if (err) reject(err);
			resolve(rows);
		});
	})
}

function getEntidadePorCategoria(categoria) {
	return new Promise(function (resolve, reject) {
		const SQL = "SELECT n_pkent, n_pktipo, c_nome, c_autor, DATE_FORMAT(d_publi, \"%M %d, %Y\") as d_publi, n_datapost, c_info, c_displocal, c_dispebook, c_linkdown, n_curtidas, c_thumbnail, c_categoria FROM liv_ent WHERE c_categoria LIKE '%"+categoria+"%' ";
		pool.query(SQL, (err, rows, fields) => {
			if (err) reject(err);
			resolve(rows);
		});
	})
}

function getEntidades () {
	return new Promise(function (resolve, reject) {
		const SQL = "SELECT n_pkent, n_pktipo, c_nome, c_autor, DATE_FORMAT(d_publi, \"%M %d, %Y\") as d_publi, n_datapost, c_info, c_displocal, c_dispebook, c_linkdown, n_curtidas, c_thumbnail, c_categoria FROM liv_ent";
		pool.query(SQL, (err, rows, fields) => {
			if (err) reject(err);
			resolve(rows);
		});
	})
}

function getCategoria(pk) {
	return new Promise(function (resolve, reject) {
		const SQL = "SELECT * FROM liv_catego WHERE n_pkcatego = "+pk;
		pool.query(SQL, (err, rows, fields) => {
			if (err) reject(err);
			resolve(rows);
		});
	})
}

function getCategorias() {
	return new Promise(function (resolve, reject) {
		const SQL = "SELECT * FROM liv_catego";
		pool.query(SQL, (err, rows, fields) => {
			if (err) reject(err);
			resolve(rows);
		});
	})
}

/**
 * --------------------------------------------------------
 *	Utils
 * --------------------------------------------------------
 */
function timestamp() {
	var ts = new Date(Date.now());
	return "["+ts.getHours()+":"+ts.getMinutes()+":"+ts.getSeconds()+"] ";
}
 
function joinResult(timeline, noticias, entidades) {
	var result = [];
	for(let item of timeline) {
		if(item.n_pktipo == NOTICIA) {
			for(let noticia of noticias) {
				if(item.n_pkent == noticia.n_pknoticia) {
					var data = {
						n_pktipo: item.n_pktipo,
						n_pkent: item.n_pkent,
						noticia: noticia
					}
					result.push(data);
					break;
				}
			}
		} else if(item.n_pktipo == ENTIDADE) {
			for(let entidade of entidades) {
				if(item.n_pkent == entidade.n_pkent) {
					var data = {
						n_pktipo: item.n_pktipo,
						n_pkent: item.n_pkent,
						entidade: entidade
					}
					result.push(data);
					break;
				}
			}
		} else {
			var data = {
				n_pktipo: item.n_pktipo,
				n_pkent: item.n_pkent
			}
			result.push(data);
		}
	}
	return result;
}

function joinCategoria(categorias, entidades){
	var result = [];
	for(let categoria of categorias){
		let count = 0;
		for(let entidade of entidades){
			if(entidade.c_categoria.indexOf(categoria.n_pkcatego) != -1){
				++count;
			}
		}
		var data = {
			n_pkcatego: categoria.n_pkcatego,
			c_nomecatego: categoria.c_nomecatego,
			c_thumbnail: categoria.c_thumbnail,
			listagem: count
		}
		result.push(data);
	}
	return result;
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}