import { db } from '../config.js';
import crypto from 'crypto';

const encrypt = (password, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
      if (err) reject(err);
      resolve(hashedPassword.toString('hex'));
    });
  });
};

export const create = async (email, password, name) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const r = await db.put({
    type: 'user',
    email,
    password: await encrypt(password, salt),
    name,
    salt,
  });
  return r;
};

export const getById = async (id) => {
  const r = await db.get(id);
  if (!r || (r.type && r.type !== 'user')) return;
  return r;
};

export const getByEmailAndPassword = async (email, password) => {
  const r = await db.fetch({
    type: 'user',
    email,
  });
  if (!r || !r?.items?.length) return;
  const user = r.items[0];
  const hashedPassword = await encrypt(
    password,
    user.salt,
  );
  if (user.password !== hashedPassword) return;
  return user;
};

export default {
  create,
  getById,
  getByEmailAndPassword,
};
