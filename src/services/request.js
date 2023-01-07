import { db } from '../config.js';

export const create = async (name, parentId, request) => {
  const r = await db.put({
    type: 'request',
    name,
    parent_id: parentId,
    request,
  });
  return r;
};

export default {
  create,
};

