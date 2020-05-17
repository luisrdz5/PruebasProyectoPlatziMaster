/**Network to manage endpoints about Categories
 * @module routes/categories/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index')

//Routs
router.post('/', insert);
router.put('/', update);
router.get('/', list);
router.get('/:id', get);
/**
 * API Endpoint to insert a Category in the data base.
 * @method POST 
 * @param {Object} req - The Category information 
 * @returns {Object} res - result of Category insertion
 */
async function insert(req, res, next){
    try{
        const resInsert = await Controller.insert(req.body);
        response.success(req, res, resInsert, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Categories');
    }
}
/**
 * API Endpoint to update a Category in the data base.
 * @method PUT 
 * @param {Object} req - The Category information to be updated
 * @returns {Object} res - result of Category update operation
 */
async function update(req, res, next){
        try{
            const resUpdate = await Controller.update(req.body);
            response.success(req, res, resUpdate, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Categories');
        }
}
/**
 * API Endpoint to list all Categories from the data base.
 * @method GET
 * @returns {<Object[]>} res - list of Categories
 */
async function list(req, res, next){
        try{
            const productList = await Controller.list();
            response.success(req, res, productList, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Categories');
        }
}
/**
 * API Endpoint to get a Category with a category ID target.
 * @method GET 
 * @param {params.id} req - The Category ID 
 * @returns {<Object[]>} res - Category
 */
async function get(req, res, next){
        try{
            const resGet = await Controller.get(req.params.id);
            response.success(req, res, resGet, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Categories');
        }
}

module.exports = router;