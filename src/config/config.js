export const config = {
  'development': {
    'username': 'apiuser',
    'password': 'Password1!',
    'database': 'jessica_janiuk_api',
    'host': 'localhost',
    'dialect': 'postgres'
  },
  'test': {
    'username': 'apiuser',
    'password': 'Password1!',
    'database': 'jessica_janiuk_api_test',
    'host': 'localhost',
    'dialect': 'postgres'
  },
  'production': {
    'use_env_variable': 'DATABASE_URL'
  },
  'globals': {
    'port': 3000,
    'bodyLimit': '100kb'
  }
};
