const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index')

//Routs
router.post('/', insert);
router.get('/', list);

function insert(req, res, next){
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network user');
        });
}

function list(req, res, next){
    Controller.list()
        .then((userList) => {
            response.success(req, res, userList, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network user');
        });
}

module.exports = router;