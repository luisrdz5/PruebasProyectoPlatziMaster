const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index')

router.post('/', login);

function login(req, res, next){
    return Controller.login(req);
}

module.exports = router;