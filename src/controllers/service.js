const services = require('../services/index.js');

const createService = async (req, res) => {
  if (!req.body.name) res.sendStatus(400);
  const r = await services.service.create(req.user.key, req.body.name);
  if (!r) res.sendStatus(400);
  res.status(201).json(r);
};

const getServiceById = async (req, res) => {
  const r = await services.service.getById(req.params.id);
  if (!r) res.sendStatus(404);
  res.status(201).json(r);
};

const createFolder = async (req, res) => {
  const parentId = req.body.parent_id || req.params.id;
  const r = await services.folder.create(
    req.body.name,
    parentId,
  );
  if (!r) res.sendStatus(400);
  res.status(201).json(r);
};

const createRequest = async (req, res) => {
    const parentId = req.body.parent_id || req.params.id;
    const r = await services.request.create(
      req.body.name,
      req.params.id,
      parentId,
      {
        type: req.body.type,
        url: req.body.url,
        body: JSON.stringify(req.body.body),
        response: JSON.stringify(req.body.response),
        headers: req.body.headers,
        params: req.body.params,
        authorization: req.body.authorization,
      },
    )
    if (!r) res.sendStatus(400);
    res.status(201).json(r);
};

const getRequestById = async (req, res) => {
  const r = await services.request.getById(req.params.request_id);
  if (!r) res.sendStatus(404);
  res.status(201).json(r);
};

module.exports = {
  createService,
  getServiceById,
  createFolder,
  createRequest,
  getRequestById,
};
