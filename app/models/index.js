var orm           = require('orm')
    , settings    = require('../../config/settings')
    , connection  = null;

function setup(db, syncModels, cb) {
  require('./customTypes')(orm, db);
  require('./post')(orm,db);
  require('./comment')(orm,db);

  if (syncModels) {
    db.sync(function(err) {
      if (err) { console.log('sync error:' , err); }
    });
  }

  // console.log("MODELS: ", db.models);
  return cb(null, db);
}

module.exports = function (cb, syncModels) {
  if (connection) return cb(null, connection);

  orm.connect(settings.database, function (err, db) {
    if (err) return cb(err);

    connection = db;
    db.settings.set('instance.returnAllErrors', true);
    setup(db, syncModels, cb);
  });
};