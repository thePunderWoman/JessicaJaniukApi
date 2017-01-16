export default 
{
  development: {
    username: 'apiuser',
    password: 'Password1!',
    database: 'jessica_janiuk_api',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
  globals: {
    port: 3000,
    bodyLimit: '100kb'
  }
};
