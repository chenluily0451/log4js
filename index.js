const express = require('express');
const app = express();
const log4js = require('log4js');


const categoriesWarn = {
	default: { appenders: [ 'out', 'app' ], level: 'warn' }
}
const categoriesError = {
	default: { appenders: [ 'out', 'app' ], level: 'error' }
}

function setConfig(categories,fileName,req){
	log4js.configure({
		appenders: {
			out: { type: 'stdout' },
			app: { type: 'file', filename: fileName }
		},
		categories: categories
	});
	var logger = log4js.getLogger();
	console.log(req)
	logger.error(`${req.query ? req.query.msg : ''}: 出错了`);
}

app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});


app.get('/error', function (req, res) {
	setConfig(categoriesError, 'error.log', req)
	// res.send('err请求成功');
});
app.get('/warn', function (req, res) {
	setConfig(categoriesWarn, 'warn.log', req)
	// res.send('warn请求成功');
	res.json({status: 200, message: 'ok'});
});

app.get('/requestError',function (req, res) {
	res.json({status: 500, message: 'code为500，userId没有传'});
})

app.listen(3080, () => {
	console.log(`Example app listening at http://localhost:3080`)
})
