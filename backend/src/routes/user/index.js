const store = require('../../store/mysql');
const ctrl = require('./controller');
/**
 * dependencies injection
 */
module.exports = ctrl(store);