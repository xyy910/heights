const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();

let connection = require('express-myconnection'),
    mysql = require('mysql');

let connection1 = connection(mysql, {
    host: '127.0.0.1',
    port: 3306,
    user: 'work',
    password: 'workwork',
    database: 'xyy',
    debug: false
});

const ApprovalFields = ["run", "swim", "dance", "water", "getup", "fruit", "happy"];
const CriticFields = ["candy", "cake", "icecream", "cookie", "sleep", "sad"];

app.use(connection1);

app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());

let router = express.Router();

router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

let curl = router.route('/faires');

curl.get(function (req, res, next) {
    req.getConnection(function (err, conn) {
        if(err) {
            return next("select Cannot Connect");
        }
        conn.query("select * from faries", function (err, rows) {
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

curl.post(function (req, res, next) {
    req.getConnection(function (err, conn) {
        if(err) {
            return next("add Cannot Connect");
        }

        let params = req.body;

        let user = params['name'];

        conn.query("select * from faries where ?", {name: user}, function (err, rows) {
            if(err) {
                console.log(err);
            }
            let fairy = JSON.parse(JSON.stringify(rows[0]));
            if(fairy) {
                res.send({
                    code : 400,
                    msg: `${user} is exist`,
                    data: null
                });
                return next(`${user} is exist`);
            }

            conn.query("INSERT INTO faries set ? ", params, function (err, rows) {
                if(err){
                    res.send({
                        code : 400,
                        msg: '',
                        data: err
                    });
                    return next("Mysql error, check your insert");
                }
                res.send({
                    code : 200,
                    msg: '',
                    data: rows
                });

            });
        });
    })
});

curl.put(function (req, res, next) {
    req.getConnection(function (err, conn) {
        if(err) {
            return next("update Cannot Connect");
        }

        let params = req.body;
        let user = params['name'];
        conn.query("select * from faries where ?", {name: user}, function (err, rows) {
            if(err) {
                console.log(err);
            }
            let fairy = JSON.parse(JSON.stringify(rows[0]));
            if(!fairy) {
                res.send({
                    code : 400,
                    msg: `${user} is not exist`,
                    data: null
                });
                return next(`${user} is not exist`);
            }

            let weightPre = fairy.weight;
            let field = params['field'];
            let preVal = fairy[field];
            fairy[field] = params['value'];

            if(_.includes(ApprovalFields, field)) {
                fairy['weight'] = parseInt(weightPre) + parseInt(preVal) - parseInt(params['value']);
            }else if(_.includes(CriticFields, field)) {
                fairy['weight'] = parseInt(weightPre) + parseInt(params['value']) - parseInt(preVal);
            }else{
                res.send({
                    code : 200,
                    msg: '',
                    data: fairy
                });
                return;
            }

            let id = fairy.id;
            delete fairy.id;

            conn.query("update faries set ? where id= ? ", [fairy, id], function (err, rows) {
                if(err){
                    res.send({
                        code : 400,
                        msg: '',
                        data: err
                    });
                    return next("Mysql error, check your update");
                }
                res.send({
                    code : 200,
                    msg: '',
                    data: fairy
                });
            });
        });

    });
});


app.use('/faires/api', router);

let server = app.listen('3000', function () {
    console.log("Listening to port %s",server.address().port);
});

module.exports = server;