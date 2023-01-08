import express from 'express';
import passport from 'passport';
import session from 'express-session';
import memoryStore from 'memorystore';
import { auth, service } from './routers/index.js';

const DEV = process.env.NODE_ENV === 'development';
const app = express();
const MemoryStore = memoryStore(session);

// parse body
app.use(express.json())
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
app.use('/service', service);
app.use('/auth', auth);

if (DEV) {
  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`Mosh is listening on port ${PORT}`);
  });
} else {
  module.exports = app;
}
