// utils.js
const connection = require("../config/db");
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
module.exports = utils;
