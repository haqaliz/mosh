import { db } from '../config.js';

export const create = async (name, parentId) => {
  const r = await db.put({
    type: 'folder',
    name,
    parent_id: parentId,
  });
  return r;
};

export default {
  create,
};
