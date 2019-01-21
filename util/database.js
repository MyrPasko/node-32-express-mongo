/** For Sequelize */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'Pp><2*1*9--', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

/** For essential MySQL */
// const mysql = require('mysql2');
//
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node_complete',
//     password: 'Pp><2*1*9--'
// });
//
// module.exports = pool.promise();