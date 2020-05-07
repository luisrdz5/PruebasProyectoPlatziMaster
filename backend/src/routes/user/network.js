const express = require('express');
const router = express.Router();
const Controller = require('./index')

//Routs
router.post('/', insert);

function insert(req, res, next){
    Controller.upsert(req.body)
        .then((user) => {
            console.log(user);
           res.send('Hola mundo post user')
        })
        .catch('handle error post hola');
}

module.exports = router;