import { Deta } from 'deta';

const DEV = process.env.NODE_ENV === 'development';
const deta = Deta(DEV && 'b0syngdn_SvdzZ6d2p1YLUWBf4HazfaoCJwDmu3ee');
export const db = deta.Base('mosh');

export default {
  db,
};
