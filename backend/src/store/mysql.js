/** 
 *Module for create/read/update/delete information of a data base MySQL. 
 *@module mysql
*/
const mysql = require('mysql');
const config = require('../config/index');
//const fs = require('fs');
/**
 * Fetch the environment variables to connect to a data base MySQL.
 */
const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.dbPort
};
let connection;
/**
 * Handle the connection to a database MySQL.
 */
function handleCon(){
    connection = mysql.createConnection(dbconf);
    console.log('DB connecting');
    connection.connect( (err) => {
        if(err){
            console.error('[db err]', err);
            return
            //setTimeout(handleCon, 2000);
        }else{
            console.log('DB connected as id ' + connection.threadId);
        }
    });
}

handleCon();
/**
 * Insert data into the target table
 * @param {string} table - The target table 
 * @param {object} data - Data to insert into table
 * @returns {promise} result of data insertion
 */
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
/**
 * Update tuples with a customized query in the target table and id target.
 * @param {string} query - The customized query to UPDATE data
 * @param {Object} data - The data to update
 * @returns {Promise} - result of the update operation.
 */
function update(query, data){
    return new Promise( (resolve, reject) => {
        connection.query(query,data, (err, result) => {
            if(err){
                return reject(err);
            }
            resolve(result);
        })
    })
}
/**
 * List all tuples from the target table
 * @param {String} table - The target table 
 * @returns {Promise<object[]>} - array with query results.
 */
function list(table){
    console.log(`getting list in mysql.js ${connection}`);
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err){
                return reject(err);
            }
            console.log(`enviando data: ${data} `);
            resolve(data);
        })
    })
}

/**
 * Fetch tuples with a customized query from the target table.
 * @param {string} query - The customized query 
 * @returns {Promise} - array with query results.
 */
function get(query){
    return new Promise( (resolve, reject) => {
        connection.query(query, (err, data) => {
            if (err){
                return reject(err);
            }
            resolve(data || null);
        })
    })
}

module.exports = {
    insert,
    update,
    list,
    get,
}
