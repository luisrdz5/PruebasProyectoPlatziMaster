const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index')

//Routs
router.post('/', insert);
router.put('/', update);
router.get('/', list);
router.get('/search/name', searchByName);
router.get('/search/price', searchByPrice);
router.get('/search/category/:id', searchByCategory);
router.get('/:id', get);

function insert(req, res, next){
    Controller.insert(req.body)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network Products');
        });
}

function update(req, res, next){
    Controller.update(req.body)
        .then((res_update) => {
            response.success(req, res, res_update, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network Products');
        });
}

function list(req, res, next){
    Controller.list()
        .then((productsList) => {
            response.success(req, res, productsList, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network Products');
        });
}

function get(req, res, next){
    Controller.get(req.params.id)
        .then((product) => {
            response.success(req, res, product, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network Products');
        });
}

function searchByName(req, res, next){
    Controller.getProductByName(req.query.s)
        .then((resultSearch) => {
            response.success(req, res, resultSearch, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network SearchByName');
        });
    
}
function searchByPrice(req, res, next){
    Controller.getProductByPrice(req.query.min_price, req.query.max_price)
        .then((resultSearch) => {
            response.success(req, res, resultSearch, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network SearchByName');
        });    
}
function searchByCategory(req, res, next){
    Controller.getProductsByCategory(req.params.id)
        .then((resultSearch) => {
            response.success(req, res, resultSearch, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network SearchByCategory');
        });    
}

module.exports = router;