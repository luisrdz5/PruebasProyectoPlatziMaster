const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index')

//Routs
router.post('/', insert);
router.put('/', update);
router.get('/', list);
router.get('/:id', get);

async function insert(req, res, next){
    try{
        const resInsert = await Controller.insert(req.body);
        response.success(req, res, resInsert, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Categories');
    }
}

async function update(req, res, next){
        try{
            const resUpdate = await Controller.update(req.body);
            response.success(req, res, resUpdate, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Categories');
        }
}

async function list(req, res, next){
        try{
            const productList = await Controller.list();
            response.success(req, res, productList, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Categories');
        }
}

async function get(req, res, next){
        try{
            const resGet = await Controller.get(req.params.id);
            response.success(req, res, resGet, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Categories');
        }
}

module.exports = router;