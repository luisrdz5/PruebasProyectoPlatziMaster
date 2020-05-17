/**Network to manage endpoints about Users
 * @module routes/user/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index')

/**
 * Insert data into the target table
 *@type {router} - Routs to manage Users
 */
router.post('/', insert);
router.get('/', list);
router.get('/:id', get);
router.get('/addr/:id', getAddr);
/**
 * API Endpoint to insert an User in the data base.
 * @method POST 
 * @param {Object} req - The User information 
 * @returns {Object} res - result of User insertion
 * @example
 *      body = {
 *          "email": "email@host.com"
 * 	        "password": "1234"     
 *      }
 */
async function insert(req, res, next){
      try {
          const userRes = await Controller.insert(req.body);
          response.success(req, res, userRes, 200);
      } catch( err){
          response.error(req, res, err.message, 500, 'error network user');
      }
}
/**
 * API Endpoint to list all Users from the data base. 
 * @method GET
 * @returns {<Object[]>} res - list of Users
 */
async function list(req, res, next){
        try {
            const userList = await Controller.list();
            response.success(req, res, userList, 200);
        } catch( err){
            response.error(req, res, err.message, 500, 'error network user');
        }
}
/**
 * API Endpoint to get an User with an user ID target.
 * @method GET 
 * @param {params} req - The User ID 
 * @returns {<Object[]>} res - User
 */
async function get(req, res, next){
        try {
            const userGetById = await Controller.get(req.params.id);
            response.success(req, res, userGetById, 200);
        } catch( err){
            response.error(req, res, err.message, 500, 'error network user');
        }
}
/**
 * API Endpoint to get all Addresses with an user ID target.
 * @method GET 
 * @param {params} req - The User ID
 * @returns {<Object[]>} res - List of User Addresses
 */
async function getAddr(req, res, next){
        try {
            const userAddr = await Controller.getAddr(req.params.id);
            response.success(req, res, userAddr, 200);
        } catch( err){
            response.error(req, res, err.message, 500, 'error network user');
        }
}

module.exports = router;