const { db } = require('../config.js');

const create = async (name, parentId) => {
  const r = await db.put({
    type: 'folder',
    name,
    parent_id: parentId,
  });
  return r;
};

module.exports = {
  create,
};
