import express from 'express';
import serviceRouter from './routers/service.js';

const DEV = process.env.NODE_ENV === 'development';
const app = express();

// parse body
app.use(express.json())
app.use('/service', serviceRouter);

if (DEV) {
  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
} else {
  module.exports = app;
}
