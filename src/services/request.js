const { db } = require('../config.js');

const create = async (name, parentId, request) => {
  const r = await db.put({
    type: 'request',
    name,
    parent_id: parentId,
    request,
  });
  return r;
};

const getById = async (id) => {
  const r = await db.get(id);
  if (!r || r?.type !== 'request') return;
  return {
    id: r.key,
    name: r.name,
    parent_id: r.parent_id,
    request: r.request,
  };
};

module.exports = {
  create,
  getById,
};

