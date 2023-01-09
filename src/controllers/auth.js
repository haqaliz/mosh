const services = require('../services/index.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (username, password, cb) => {
      const r = await services.user.getByEmailAndPassword(username, password);
      if (!r) return cb(null, false);
      return cb(null, r);
    },
  )
);

passport.serializeUser((u, cb) => cb(null, u));

passport.deserializeUser((u, cb) => cb(null, u));

const authenticate = async (req, res, next) => {
  passport.authenticate('local', (err, u) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email?.length || !password?.length) return res.sendStatus(400);
    if (err) return next(err);
    if (!u) return res.status(404).send('Unauthorized');
    req.login(u, (loginErr) => {
      if (loginErr) return next(loginErr);
      return res.sendStatus(200);
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    return res.sendStatus(200);
  });
};

const signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email?.length || !password?.length) res.sendStatus(400);
  if (await services.user.getByEmailAndPassword(email, password)) {
    res.status(400).send('Email is already taken');
  }
  const r = await services.user.create(email, password, req.body.name);
  if (!r) res.sendStatus(400);
  res.status(201).json(r);
};

module.exports = {
  authenticate,
  logout,
  signup,
};
