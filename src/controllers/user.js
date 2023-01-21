const services = require('../services/index.js');

const getCurrent = async (req, res) => {
  if (!req.user) res.sendStatus(400);
  const r = req.user;
  res.status(201).json({
    key: r.key,
    email: r.email,
  });
};

const getServices = async (req, res) => {
  if (!req.user) res.sendStatus(400);
  const r = await services.service.getAllServicesByUserId(req.user.key);
  if (!r) res.sendStatus(404);
  res.status(201).json(r);
};


module.exports = {
  getCurrent,
  getServices,
};
