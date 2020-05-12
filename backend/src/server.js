const express = require('express');
const config = require('./config/index');

const user = require('./routes/user/network');
const login = require('./routes/login/network');
const products = require('./routes/products/network');

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../doc/swagger.json');

const app = express();
app.use(express.json());


//ROUTER
app.use('/api/user', user);
app.use('/api/login', login);
app.use('/api/products', products);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.use((req, res, next) => {
    res.status(404).send({
    status: 404,
    error: 'Not found'
    })
})

app.listen(config.port, function (){
    console.log(`Server is listenning in: http://localhost:${config.port}`);
})
