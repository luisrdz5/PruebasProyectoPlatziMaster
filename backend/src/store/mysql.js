const mysql = require('mysql');
const config = require('../config/index');

const dbconf_pro = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.name,
};

const dbconf_dev = {
    host: config.mysql_dev.host,
    user: config.mysql_dev.user,
    password: config.mysql_dev.password,
    database: config.mysql_dev.name,
};

const env_dev = config.production;

let dbconf;
if(env_dev === true){
    dbconf = dbconf_pro;
}else{
    dbconf = dbconf_dev;
}

let connection;

function handleCon(){
    connection = mysql.createConnection(dbconf);

    connection.connect( (err) => {
        if(err){
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        }else{
            console.log('DB connected');
        }
    });
}

handleCon();

function insert(table, data){
    return new Promise( (resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if(err){
                return reject(err);
            }
            resolve(result);
        })
    })
}

function list(table){
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err){
                return reject(err);
            }

            resolve(data);

        })
    })
}

//function get(table, id){
function get(query){
    return new Promise( (resolve, reject) => {
        connection.query(query, (err, data) => {
            if (err){
                return reject(err);
            }

            resolve(data[0] || null);

        })
    })
}

module.exports = {
    insert,
    list,
    get,
}
