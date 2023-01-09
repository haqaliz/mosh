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

module.exports = {
  create,
};

