const { Deta } = require('deta');

const DEV = process.env.NODE_ENV === 'development';
const deta = Deta('b0syngdn_SvdzZ6d2p1YLUWBf4HazfaoCJwDmu3ee');
const db = deta.Base('mosh');

module.exports = {
  db,
};
