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
router.get('/search/category', searchByCategory);
router.get('/:id', get);

async function insert(req, res, next){
    try{
        const resInsert = await Controller.insert(req.body);
        response.success(req, res, resInsert, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products');
    }
}

async function update(req, res, next){
    try{
        const resUpdate = await Controller.update(req.body);
        response.success(req, res, resUpdate, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products');
    }
}

async function list(req, res, next){
        try{
            const resList = await Controller.list();
            response.success(req, res, resList, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Products');
        }
}

async function get(req, res, next){
        try{
            const resGetProd = await Controller.get(req.params.id);
            response.success(req, res, resGetProd, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Products');
        }
}

async function searchByName(req, res, next){
        try{
            const resultSearch = await Controller.getProductByName(req.query.s);
            response.success(req, res, resultSearch, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Products');
        }    
}
async function searchByPrice(req, res, next){
        try{
            const resultSearch = await Controller.getProductByPrice(req.query.min_price, req.query.max_price);
            response.success(req, res, resultSearch, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Products');
        }        
}
async function searchByCategory(req, res, next){
        try{
            const resultSearch = await Controller.getProductsByCategory(req.query.cat_id);
            response.success(req, res, resultSearch, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Products');
        }
}

module.exports = router;