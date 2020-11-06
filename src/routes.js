const { Router } = require('express');
const multer = require('multer');

const routes = new Router();
const multerConfig = require('./config/multer');
const upload = multer(multerConfig);

routes.get('/', (req, res) => res.render('pages/index'));

routes.post('/register', upload.single('image'), (req, res, next) => {
  res.send(req.body);
}) 

module.exports = routes;