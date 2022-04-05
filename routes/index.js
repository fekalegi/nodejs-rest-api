var express = require('express');
var router = express.Router();

const moviesController = require('../controllers').movies;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Movies Router */
router.get('/api/movies', moviesController.list);
router.get('/api/movies/:id', moviesController.getById);
router.post('/api/movies', moviesController.add);
router.put('/api/movies/:id', moviesController.update);
router.delete('/api/movies/:id', moviesController.delete);

module.exports = router;
