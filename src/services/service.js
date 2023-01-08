import { db } from '../config.js';

export const create = async (userId, name) => {
  const r = await db.put({
    type: 'service',
    user_id: userId,
    name,
  });
  return r;
};

export const getChildren = async (id) => {
  const where = {
    parent_id: id,
  };
  let r = await db.fetch(where);
  let items = r.items;
  while (r.last){
    res = await db.fetch(where, { last: r.last });
    items = items.concat(r.items);
  }
  return await Promise.all(items.map(async (i) => {
    if (!i.type || i.type !== 'folder') return i;
    const children = await getChildren(i.key);
    return {
      ...i,
      children,
    };
  }));
};

export const getById = async (id) => {
  const r = await db.get(id);
  if (
    !r
    || (r.type && r.type !== 'service')
  ) return;
  const children = await getChildren(r.key);
  return {
    name: r.name,
    children,
  };
};

export default {
  create,
  getById,
  getChildren,
};
