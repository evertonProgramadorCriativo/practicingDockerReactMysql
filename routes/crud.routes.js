module.exports = app => {
    const dbtypes = require("../controllers/databaseTypes.controller.js");
  
    var router = require("express").Router();
  
    // Create a new dbtypes
    router.post("/", dbtypes.create);
  
    // Retrieve all dbtypes
    router.get("/", dbtypes.findAll);
  
    // Retrieve all published dbtypes
    router.get("/published", dbtypes.findAllPublished);
  
    // Retrieve a single dbtypes with id
    router.get("/:id", dbtypes.findOne);
  
    // Update a dbtypes with id
    router.put("/:id", dbtypes.update);
  
    // Delete a dbtypes with id
    router.delete("/:id", dbtypes.delete);
  
    // Create a new dbtypes
    router.delete("/", dbtypes.deleteAll);
  
    app.use('/api/dbtypes', router);
  };