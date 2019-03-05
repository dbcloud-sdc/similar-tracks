module.exports = {
  POSTGRES: {
    URL: 'url',
    PORT: port,
    USER: 'user',
    PASS: 'pass',
    DBNAME: 'dbname'
  },
  SERVER: {
    URL: 'localhost',
    PORT: '3000'
  },
  CORS: {
    ENABLED: false,
    ORIGIN: '*', //don't do this, OK?
    METHODS: 'GET, PUT, POST, DELETE'
  }
};

export default CONFIG;
