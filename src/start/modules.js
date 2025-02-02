const fileUpload = require('express-fileupload');
const errorHandler = require('../middlewares/error.handler.middleware');
const routes = require('../routes');
const cors = require('cors')

module.exports = async (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({
    origin: "*",
  }));
  app.use(fileUpload());

  app.use('/api', routes);

  app.use(errorHandler);
};
