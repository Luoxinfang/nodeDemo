/**
 * Created with JetBrains WebStorm.
 * User: luoxinfang
 * Date: 13-10-15
 * Time: 下午7:29
 * To change this template use File | Settings | File Templates.
 */
var settings = require('../settings'),
  Db = require('mongodb').Db,
  Connection = require('mongodb').Connection,
  Server = require('mongodb').Server;
module.exports = new Db(
  settings.db,
  new Server(settings.host, Connection.DEFAULT_PORT, {})
);
