const services = require('../services/index.js');

const getCurrent = async (req, res) => {
  if (!req.user) res.sendStatus(400);
  const r = req.user;
  res.status(201).json({
    key: r.key,
    email: r.email,
  });
};

module.exports = {
  getCurrent,
};
