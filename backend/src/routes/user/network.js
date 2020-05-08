const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index')

//Routs
router.post('/', insert);
router.get('/', list);
router.get('/:id', get);
router.get('/addr/:id', getAddr);

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

function get(req, res, next){
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network user');
        });
}

function getAddr(req, res, next){
    Controller.getAddr(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network user');
        });
}

module.exports = router;