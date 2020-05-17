const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index')

router.post('/', login);

async function login(req, res, next){
        try {
            const loginRes = await Controller.login(req.body.email, req.body.password);
            response.success(req, res, loginRes, 200);
        } catch( err){
            response.error(req, res, err.message, 500, 'error network user');
        }
}

module.exports = router;