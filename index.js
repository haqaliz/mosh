const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const routers = require('./src/routers/index.js');

const DEV = process.env.NODE_ENV === 'development';
const app = express();

// parse body
app.use(express.json())
app.use(cors());
app.use(session({
  cookie: { maxAge: 864e5 },
  store: new MemoryStore({
    // prune expired entries every 24h
    checkPeriod: 864e5,
  }),
  saveUninitialized: false,
  resave: false,
  secret: 'keyboard cat'
}));
app.use(passport.authenticate('session'));
app.use('/auth', routers.auth);
app.use('/service', routers.service);
app.use('/user', routers.user);

if (DEV) {
  const PORT = 8081;
  app.listen(PORT, () => {
    console.log(`Mosh is listening on port ${PORT}`);
  });
} else {
  module.exports = app;
}
