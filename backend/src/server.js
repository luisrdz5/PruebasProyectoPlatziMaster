const express = require('express');
const config = require('./config/index');

const user = require('./routes/user/network');
const products = require('./routes/products/network');

const app = express();
app.use(express.json());


//ROUTER
app.use('/api/user', user);
app.use('/api/products', products);

app.listen(config.port, function (){
    console.log(`Server is listenning in: http://localhost:${config.port}`);
})
