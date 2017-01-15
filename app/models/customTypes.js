/*
 defines a custom data type :
 `textArray` maps to psql `text []` type
 */
 
 module.exports = function(orm, db){
  db.defineType('textArray', {
    datastoreType: function (prop) {
      return 'text []';
    },

    valueToProperty: function (value, prop) {
      if (Array.isArray(value)) {
        return value;
      } 
      else {
        if (value) {
          return value.split(',').map(function (v) {
            return String(v);
          });
        } 
        else {
          return null;
        }
      }
    },

    propertyToValue: function (value, prop) {
      return value.join(',');
    }
  });
};