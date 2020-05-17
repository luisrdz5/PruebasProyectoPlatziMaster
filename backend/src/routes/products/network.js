/**Network to manage endpoints about Products
 * @module routes/products/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index')

/**
 * Insert data into the target table
 *@type {router} - Routs to manage Products
 */
router.post('/', insert);
router.put('/', update);
router.get('/', list);
router.get('/search/name', searchByName);
router.get('/search/price', searchByPrice);
router.get('/search/category', searchByCategory);
router.get('/:id', get);
/**
 * API Endpoint to insert a Product in the data base.
 * @method POST 
 * @param {Object} req - The Product information 
 * @returns {Object} res - result of Product insertion
 */
async function insert(req, res, next){
    try{
        const resInsert = await Controller.insert(req.body);
        response.success(req, res, resInsert, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products');
    }
}
/**
 * API Endpoint to update a Product in the data base.
 * @method PUT 
 * @param {Object} req - The Product information to be updated
 * @returns {Object} res - result of Product update operation
 */
async function update(req, res, next){
    try{
        const resUpdate = await Controller.update(req.body);
        response.success(req, res, resUpdate, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products');
    }
}
/**
 * API Endpoint to list all Products from the data base.
 * @method GET
 * @returns {<Object[]>} res - list of Products
 */
async function list(req, res, next){
        try{
            const resList = await Controller.list();
            response.success(req, res, resList, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Products');
        }
}
/**
 * API Endpoint to get a Product with a product ID target.
 * @method GET 
 * @param {params} req - The Product ID 
 * @returns {<Object[]>} res - Product
 */
async function get(req, res, next){
        try{
            const resGetProd = await Controller.get(req.params.id);
            response.success(req, res, resGetProd, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Products');
        }
}
/**
* API Endpoint to search all products with a word that match into the product description or title.
* @method GET 
* @param {query} req - The word to search into the products
* @returns {<Object[]>} res - Product list that match with the word in the.
* @example ?s=word_to_search
*/
async function searchByName(req, res, next){
        try{
            const resultSearch = await Controller.getProductByName(req.query.s);
            response.success(req, res, resultSearch, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Products');
        }    
}
/**
* API Endpoint to search all products with a price range.
* @method GET 
* @param {query.min_price} req - min price
* @param {query.max_price} req - max price
* @returns {<Object[]>} res - Product list that match with the price range.
* @example ?min_price=1&max_price=5
*/
async function searchByPrice(req, res, next){
        try{
            const resultSearch = await Controller.getProductByPrice(req.query.min_price, req.query.max_price);
            response.success(req, res, resultSearch, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Products');
        }        
}
/**
* API Endpoint to search all products that match with a product category.
* @method GET 
* @param {query} req - The category id
* @returns {<Object[]>} res - Product list that match with the category.
* @example ?cat_id=category_id
*/
async function searchByCategory(req, res, next){
        try{
            const resultSearch = await Controller.getProductsByCategory(req.query.cat_id);
            response.success(req, res, resultSearch, 200);
        }catch(err){
            response.error(req, res, err.message, 500, 'error network Products');
        }
}

module.exports = router;