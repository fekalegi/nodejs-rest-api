const Movies = require('../models').Movies;
const Sequelize = require('../models').Sequelize;
const {success} = require('../responseAPI');
const { param } = require('../routes');


module.exports = {
  list(req, res) {
    let queryParam = "";
    let paramlimit = 10;
    if(req.query.limit != null){
      paramlimit = req.query.limit;
    }
    if(queryParam != null){
      queryParam = req.query.q;
    }
    return Movies
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
        limit: paramlimit,
        where:{
          [Sequelize.Op.or] : [
           { name: {
              [Sequelize.Op.iLike]: '%'+req.query.q+'%'
            }}, {category: {
              [Sequelize.Op.iLike]: '%'+req.query.q+'%'
            }},{ description: {
              [Sequelize.Op.iLike]: '%'+req.query.q+'%'
            }}, {thumbnail: {
              [Sequelize.Op.iLike]: '%'+req.query.q+'%'
            }}
          ]
          
        }
      })
      .then((movies) => res.status(200).send(success({data : movies})))
      .catch((error) => { res.status(400).send(console.log(error)); });
  },

  getById(req, res) {
    return Movies
      .findByPk(req.params.id, {
      })
      .then((movies) => {
        if (!movies) {
          return res.status(404).send({
            message: 'Movies Not Found',
          });
        }
        return res.status(200).send(movies);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Movies
      .create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        thumbnail: req.body.thumbnail,
      })
      .then((movies) => res.status(201).send(movies))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Movies
      .findByPk(req.params.id, {
      })
      .then(movies => {
        if (!movies) {
          return res.status(404).send({
            message: 'Movies Not Found',
          });
        }
        return movies
          .update({
            name: req.body.name || movies.name,
            description: req.body.description || movies.description,
            category: req.body.category || movies.category,
            thumbnail: req.body.thumbnail || movies.thumbnail,
          })
          .then(() => res.status(200).send(movies))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Movies
      .findByPk(req.params.id)
      .then(movies => {
        if (!movies) {
          return res.status(400).send({
            message: 'Movies Not Found',
          });
        }
        return movies
          .destroy().then(() => res.status(200).send(movies))
      })
      .catch((error) => res.status(400).send(error));
  },
};
