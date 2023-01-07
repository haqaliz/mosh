import { service, folder, request } from '../services/index.js';

export const create = async (req, res) => {
  if (!req.body.name) res.sendStatus(400);
  const r = await service.create(req.body.name);
  if (!r) res.sendStatus(400);
  res.status(201).json(r);
};

export const getById = async (req, res) => {
  const r = await service.getById(req.params.id);
  if (!r) res.sendStatus(404);
  res.status(201).json(r);
};

export const createFolder = async (req, res) => {
  const parentId = req.body.parent_id || req.params.id;
  const r = await folder.create(
    req.body.name,
    parentId,
  );
  res.status(201).json(r);
};

export const createRequest = async (req, res) => {
    const parentId = req.body.parent_id || req.params.id;
    const r = await request.create(
      req.body.name,
      parentId,
      {
        type: req.body.type,
        url: req.body.url,
        body: req.body.body,
        headers: req.body.headers,
        params: req.body.params,
        authorization: req.body.authorization,
      },
    )
    res.status(201).json(r);
};

export default {
  create,
  getById,
  createFolder,
  createRequest,
};
