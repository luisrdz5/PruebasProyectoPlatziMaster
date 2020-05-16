const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index')

//Routs
router.post('/', insert);
router.get('/', list);
router.get('/:id', get);
router.get('/addr/:id', getAddr);

async function insert(req, res, next){
      try {
          const userRes = await Controller.insert(req.body);
          response.success(req, res, userRes, 200);
      } catch( err){
          response.error(req, res, err.message, 500, 'error network user');
      }
}

async function list(req, res, next){
        try {
            const userList = await Controller.list();
            response.success(req, res, userList, 200);
        } catch( err){
            response.error(req, res, err.message, 500, 'error network user');
        }
}

async function get(req, res, next){
        try {
            const userGetById = await Controller.get(req.params.id);
            response.success(req, res, userGetById, 200);
        } catch( err){
            response.error(req, res, err.message, 500, 'error network user');
        }
}

async function getAddr(req, res, next){
        try {
            const userAddr = await Controller.getAddr(req.params.id);
            response.success(req, res, userAddr, 200);
        } catch( err){
            response.error(req, res, err.message, 500, 'error network user');
        }
}

module.exports = router;