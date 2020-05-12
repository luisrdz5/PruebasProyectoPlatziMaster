const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const { config } = require("./config");
const { ENV, PORT } = process.env;
const app = express(); 


/**
 * Using a body parser to work with the information
 */
app.use(express.json());
/**
 * Using a cookie parser to work with the cookies of the client
 */
app.use(cookieParser());

/**
 * We get the passport basic strategy to use the email password authentication 
 */
require('./utils/auth/strategies/basic');

if(ENV === 'development'){
    console.log('development config');
}
/**
 * Endpoint to do a sign in  
 */
app.post("/auth/sign-in", async function(req, res, next) {
/**
 * Call to the basic authentication
*/
    passport.authenticate("basic", function(error, data) {
        try{
        /**
         * verifying the user authentication
        */
            if(error || !data){
                next(boom.unauthorized());
            }
            req.login(data, { session: false }, async function(error){
                if(error){
                    next(error);
                }
                /**
                 * Creating the cookie in the client browser
                */
                res.cookie("token", token, {
                    httpOnly: !config.dev,
                    secure: !config.dev
                });
                /**
                 * Response to the user
                */
                res.status(200).json(user);
            })
        }catch() {

        }

    })(req, res, next)
});

app.post("/auth/sign-up", async function(req, res, next) {
    const { body: user } = req;

    try{
        await axios({
            url: `${config.apiUrl}/api/auth/sign-up`,
            method: "post",
            data: user
        });
        /* *
         * Response to the user
        */
        res.status(201).json({ message: "user created "})

    }catch(error){
        next(error);
    }
});


app.listen(PORT, (err) => {
    if(err) console.error(err);
    else console.log(`Server is running in the port ${PORT}`);
})