var models = require('./app/models');

models(function (err, db) {
  if (err) {
      if (err.message.indexOf('ECONNREFUSED') > 0) {
          throw new Error("Could not connect to database: " + settings.database.host);
      }
      else {
        console.log(err);
          return next(err);
      }
  }
  else {
    console.log('models synced.');
    process.exit();
  }
}, true); //true calls 'syncModel');