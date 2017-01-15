var getLogPath = function(path) {
  if (path.substring(0,1) == "~") {
    var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    path = home + path.substring(1, path.length - 1);
  }
  return path;
};

// NOTE: use this script to create an nconf compatible settings file.  It will create (or overwrite/update) a file called nconf.json in the same folder as this script.
var fs        = require('fs'),
    nconf     = require('nconf'),
    path      = require('path'),
    pkg       = JSON.parse(fs.readFileSync('package.json', 'utf8'));

nconf.env().argv(); //load environment settings and args

//load user settings first, if file exists
var userFile = path.join(__dirname, 'settings-user.json');
if (fs.existsSync(userFile)) {
  console.log('user settings:', userFile);
  nconf.add('user', { type: 'file', file: userFile });  
}

//determine which settings file to apply
var key = "development"; // "development" is the default if an environment is not determined to have been supplied

//priority 1: was an argument passed while starting up node?  e.g. node server.js staging
if (process.argv[2]) {
  key = process.argv[2].toLowerCase();
}
//priority 2: match on "env" in user-settings.js
else if (nconf.get('env')) {
  key = nconf.get('env');
}
//priority 3: match on "env" in package.json
else if (pkg.env) {
  key = pkg.env.toLowerCase();
}

console.log('using settings key: ', key);

var settingsFile = path.join(__dirname, 'settings-' + key + '.json');
if (!fs.existsSync(settingsFile)) {
  console.error('NO GLOBAL SETTINGS FILE NOT FOUND');
}
else {
  console.log('global settings:', settingsFile);
  nconf.add('global', { type: 'file', file: settingsFile });
}

// Database settings specific to the environment we are using (notice use of key and parsing the JSON from database.json)
var databaseFile = path.join(__dirname, 'database.json');
nconf.merge('database', JSON.parse(fs.readFileSync(databaseFile))[key]);

//add in-memory settings
nconf.set('path', path.normalize(path.join(__dirname, '..')));  //add current path

console.log('DB HOST:', nconf.get('database:host'));
console.log('DB NAME:', nconf.get('database:database'));
console.log('PORT:', nconf.get('port'));


var settings = {
  env        : key,
  version    : pkg.version,
  path       : nconf.get('path'),
  port       : process.env.VCAP_APP_PORT || nconf.get('port'),
  database   : {
    protocol :  nconf.get('database:driver'),
    query    :  nconf.get('database:query'),
    host     :  nconf.get('database:host'),
    port     :  nconf.get('database:port'),
    database :  nconf.get('database:database'),
    user     :  nconf.get('database:user'),
    password :  nconf.get('database:password'),
    pool_size:  nconf.get('database:pool_size'),
    debug    :  nconf.get('database:debug_queries')
  },
  logging: {
    console: nconf.get('logging:console'),
    file: nconf.get('logging:file'),
    path: getLogPath(nconf.get('logging:path'))
  }
};

console.log(JSON.stringify(settings));

process.env.NODE_ENV = settings.env;

module.exports = settings;
