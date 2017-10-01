'use strict';
const express = require("express");
const router = express();
let DB = require('../tools/database')

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    res.header("Allow-Control-Access-Method", "POST", "GET");
    next();
});

router.post('/',async (req,res)=>{
    if(req.body.query ==='getIp'){
        res.send({ip:req.clientIp})
    }
    else {
        if(DB[req.body.queryMethod] && req.body.queryData){
            await DB[req.body.queryMethod](req.body.queryData)
                .then(function (success) {
                    res.statusCode = 200
                    res.send(success)
                })
                .catch(function (err) {
                    res.statusCode = 200
                    res.send(err)
                })
        }
        else {
            res.statusCode = 200
            res.send({error:"query method or data invalid"})
        }
    }

})

module.exports = router
