/**Network to manage endpoints about Addresses of a user
 * @module routes/addresses/network
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
 * API Endpoint to insert a Address in the data base.
 * @method POST 
 * @param {Object} req - The address information 
 * @returns {Object} res - result of Address insertion
 */
async function insert(req, res, next){
    try{
        const resInsert = await Controller.insert(req.body);
        response.success(req, res, resInsert, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Addresses');
    }
}
/**
 * API Endpoint to update a Address in the data base.
 * @method PUT 
 * @param {Object} req - The Address information to be updated
 * @returns {Object} res - result of Address update operation
 */
async function update(req, res, next){
        try{
            const resUpdate = await Controller.update(req.body);
            response.success(req, res, resUpdate, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Addresses');
        }
}
/**
 * API Endpoint to list all Addresses from the data base. //debug purpose
 * @method GET
 * @returns {<Object[]>} res - list of Addresses
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
 * API Endpoint to get an Address with a user ID target.
 * @method GET 
 * @param {params.id} req - The user ID 
 * @returns {<Object[]>} res - Address own to user id
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