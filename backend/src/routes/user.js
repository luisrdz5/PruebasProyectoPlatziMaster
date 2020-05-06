const express = require('express');
const UserService = require('../services/UserService');

function usersAPI(app) {
    const router = express.Router();
    app.use('api/users', router);

    router.get('/', (req,res) => {
        res.send(` API Users v 0.0.1`);
    });
    router.get('/getUsers', async (req,res) => {
        const userService=new UserService()
        try{
            const data = await userService.getUsers();
            res.status(200).json({
                data,
                message: 'users listed'
              });
        }catch(error){
            res.status(500).json({
                data,
                error: 'error getting users'
            })
        }
    })
}
module.exports = usersAPI;