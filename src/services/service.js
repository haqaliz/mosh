const { db } = require('../config.js');

const create = async (userId, name) => {
  const r = await db.put({
    type: 'service',
    user_id: userId,
    name,
  });
  return r;
};

const formatChildren = (children) => {
  return children.map((i) => ({
    id: i.key,
    name: i.name,
    parent_id: i.parent_id,
    type: i.type,
    request: i.request,
  }));
};

const getChildren = async (id) => {
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
      children: formatChildren(children),
    };
  }));
};

const getById = async (id) => {
  const r = await db.get(id);
  if (
    !r
    || (r.type && r.type !== 'service')
  ) return;
  const children = await getChildren(r.key);
  return {
    name: r.name,
    children: formatChildren(children),
  };
};

const getAllServicesByUserId = async (userId) => {
  const r = await db.fetch({
    type: 'service',
    user_id: userId,
  });
  if (!r || !r?.items?.length) return [];
  const user = r.items[0];
  return await Promise.all(r.items.map((i) => getById(i.key)));
};

module.exports = {
  create,
  getById,
  getChildren,
  getAllServicesByUserId,
};
