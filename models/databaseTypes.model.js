module.exports = (sequelize, Sequelize) => {
    const Dbtypes = sequelize.define("dbtypes", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Dbtypes;
  }