const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const { ENV, PORT } = process.env;

const app = express(); 

if(ENV === 'development'){
    console.log('development config');
}

app.get('*', (req, res) => {
    res.send({ hello: 'express'});
});

app.listen(PORT, (err) => {
    if(err) console.error(err);
    else console.log(`Server is running in the port ${PORT}`);
})