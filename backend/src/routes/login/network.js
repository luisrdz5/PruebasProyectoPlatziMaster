const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index')

router.post('/', login);

function login(req, res, next){
    Controller.login(req.body.email, req.body.password)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch( (err) => {
            response.error(req, res, err.message, 500, 'error network Login');
        });
}

module.exports = router;