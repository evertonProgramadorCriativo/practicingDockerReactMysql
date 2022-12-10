const db = require("../models");
const Dbtypes = db.dbtypes;
const Op = db.Sequelize.Op;

// Create and Save a new Dbtypes
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty."
    });
    return;
  }

  // Create a Dbtypes
  const dbtypes = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Dbtypes in the database
  Dbtypes.create(dbtypes)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Dbtypes."
      });
    });
};

// Retrieve all Dbtypess from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Dbtypes.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Dbtypess."
      });
    });
};

// Find a single Dbtypes with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Dbtypes.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Dbtypes with id=" + id
      });
    });
};

// Update a Dbtypes by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Dbtypes.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Dbtypes was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Dbtypes with id=${id}. Maybe Dbtypes was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Dbtypes with id=" + id
      });
    });
};

// Delete a Dbtypes with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Dbtypes.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Dbtypes was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Dbtypes with id=${id}. Maybe Dbtypes was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Dbtypes with id=" + id
      });
    });
};

// Delete all Dbtypess from the database.
exports.deleteAll = (req, res) => {
  Dbtypes.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Dbtypess were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Dbtypess."
      });
    });
};

// find all published Dbtypes
exports.findAllPublished = (req, res) => {
  Dbtypes.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Dbtypess."
      });
    });
};