// const dbconfig = require("../config/database")
const settings = require("./../settings.json");
const Sequelize = require("sequelize");
const params = settings.database_params;
const db = new Sequelize(params.database, params.username, params.password, {
  host: params.host,
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  logging: params.logging ? console.log : false
});
global.Sequelize = Sequelize
global.GlobalDB = db

/*
 * Requires "global.GlobalDB" to run effectively.
 */
const Interact = {
  gt: async function(query, bind = false) {
    const q = query;
    const b = bind;
    return new Promise((resolve, reject) => {
      GlobalDB.query(q, {
        replacements: b,
        type: Sequelize.QueryTypes.SELECT
      }).then(function(rows){
        resolve(rows);
      });
    });
  },
  up: async function(query, bind = false) {
    const q = query;
    const b = bind;
    return new Promise((resolve, reject) => {
      GlobalDB.query(q, {
        replacements: b,
        type: Sequelize.QueryTypes.UPDATE
      }).then(function(rows){
        resolve(rows);
      });
    });
  },
  ins: async function(query, bind = false) {
    const q = query;
    const b = bind;
    return new Promise((resolve, reject) => {
      GlobalDB.query(q, {
        replacements: b,
        type: Sequelize.QueryTypes.INSERT
      }).then(function(rows){
        resolve(rows);
      });
    });
  },
  no: async function(query, bind = false) {
    const q = query;
    const b = bind;
    return new Promise((resolve, reject) => {
      GlobalDB.query(q, {
        replacements: b
      }).then(function(rows){
        resolve(rows);
      });
    });
  }
}

// Shorthand calls to database.
global.gt = Interact.gt;
global.up = Interact.up;
global.ins = Interact.ins;
global.no = Interact.no;
global.notypeQuery = Interact.no;










// Table models
// global.Model = Sequelize.Model
require("./models");
GlobalDB.sync({ force: params.sync });





// Shorthand string prototype's for DB
String.prototype.get = async function(callback = false) {
  const rows = await gt(this); // this = "SELECT * FROM users"
  if (callback !== false) callback(rows);
  return rows;
}

String.prototype.bound = async function(binds, callback = false) {
  var query = this;
  var rows = await gt(query, binds);
  // return await gt(query, );
  if (callback !== false) callback(rows);
  return rows;
}

Object.prototype.into = async function(tableName, callback = false) {
  var data = this;
  // console.log(data);
  var columns = Object.keys(data);
  var binds   = Object.values(data);
  // Making the ? array for writing to binders
  var binds_qm = Array(binds.length).fill("?");
  var query = `INSERT INTO ${tableName} (${columns.join(',')}) VALUES (${binds_qm.join(',')})`;
  console.log(query);
  var query_send = await ins(query, binds);
}




/*
 * Push
 */
module.exports = {
  Interact: Interact,
  seqdb: db,
}
