const dbDebugger = require('debug')('app:db');

module.exports = (res, err)=>{
  res.status(400).json({ "error": "Something error!" });
  dbDebugger(err);
}