const express = require('express');

const { config } = require('./config/index');

const app = express();
app.use(express.json());

app.listen(config.port, function (){
    console.log(`Server is listenning in: http://localhost:${config.port}`);
})