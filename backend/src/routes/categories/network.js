const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index')

//Routs
router.post('/', insert);
router.put('/', update);
router.get('/', list);
router.get('/:id', get);

function insert(req, res, next){
    Controller.insert(req.body)
        .then((category) => {
            response.success(req, res, category, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network Categories');
        });
}

function update(req, res, next){
    Controller.update(req.body)
        .then((category) => {
            response.success(req, res, category, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network Categories');
        });
}

function list(req, res, next){
    Controller.list()
        .then((categoriesList) => {
            response.success(req, res, categoriesList, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network Categories');
        });
}

function get(req, res, next){
    Controller.get(req.params.id)
        .then((category) => {
            response.success(req, res, category, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network Categories');
        });
}

module.exports = router;