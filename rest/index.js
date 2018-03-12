const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

let connection = require('express-myconnection'),
    mysql = require('mysql');

app.use(connection(mysql, {
    host: '127.0.0.1',
    port: 3306,
    user: 'work',
    password: 'workwork',
    database: 'xyy',
    debug: false
}));

app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());

let router = express.Router();

router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

let curl1 = router.route('/qs');

curl1.get(function (req, res, next) {
    req.getConnection(function (err, conn) {
        if(err) {
            return next("select Cannot Connect");
        }
        let query = conn.query("select * from questions", function (err, rows) {
            if(err) {
                console.log(err);
                return next("Mysql error, check your query");
            }
            res.send({
                code : 200,
                msg: '',
                data: rows
            });
            return rows;
        });
    })
});

curl1.post(function (req, res, next) {
    req.getConnection(function (err, conn) {
        if(err) {
            return next("add Cannot Connect");
        }

        req.assert('description', '描述不能为空').notEmpty();
        req.assert('user', '用户不能为空').notEmpty();
        req.assert('type', '问题类型不能为空').notEmpty();
        let params = req.body;
        params['isHandled'] = 0;

        conn.query("INSERT INTO questions set ? ", req.body, function (err, rows) {
            if(err){
                res.send({
                    code : 400,
                    msg: '',
                    data: err
                });
                return next("Mysql error, check your insert");
            }
            res.send({
                code : 207,
                msg: '',
                data: rows
            });

        });
    })
});

app.use('/api', router);

let server = app.listen('3000', function () {
    console.log("Listening to port %s",server.address().port);
});

module.exports = server;