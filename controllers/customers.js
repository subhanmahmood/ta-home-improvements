var connection = require('../database.js')

module.exports = {
  addItem: function(req, res){
    var query = 'INSERT INTO tblcustomer ?';
    connection.query(query, req.body, function(error, results, fields){
      if ( error ) {
        res.send({ "status": 500, "error": error, "response": null })
      };
      res.send({ "status": 200, "error": null, "response": results });

    })
  },
  find: function(req, res){
    var query = 'SELECT * FROM tblcustomer';
    connection.query(query, function(error, results, fields){
      if ( error ) {
        res.send({ "status": 500, "error": error, "response": null })
      };
      res.send({ "status": 200, "error": null, "response": results });
    })
  },
  findById: function(req, res){
    var id = parseInt(req.params.id);
    var query = 'SELECT *  FROM tblcustomer WHERE idcustomer = ?';
    connection.query(query, id, function(error, results, fields){
      if ( error ) {
        res.send({ "status": 500, "error": error, "response": null })
      };
      res.send({ "status": 200, "error": null, "response": results });
    })
  },
  deleteById(req, res){
    var id = req.params.id;
    var query = 'DELETE FROM tblcustomer WHERE idcustomer = ?';
    connection.query(query, function(error, results, fields) {
      if(error){
        res.send({ "status": 500, "error": error, "response": null })        
      }
      res.send({ "status": 200, "error": null, "response": results })      
    })
  },
  findAndUpdateById: function(req, res){
    var id = req.params.id;
    var body = req.body;
    var query = 'UPDATE tblcustomer SET ? WHERE idcustomer = 33';
    connection.query(query, req.body, function(error, results, fields) {
      if ( error ) {
        res.send({ "status": 500, "error": error, "response": null })
      };
      res.send({ "status": 500, "error": null, "response": results})
    });
  },
  deleteAll: function(req, res){
    var query = 'DELETE FROM tblpart';
    connection.query(query, function(error, results, fields){
      if ( error ) {
        res.send({ "status": 500, "error": error, "response": null })
      };
      res.send({ "status": 200, "error": null, "response": results });
    })
  }
} 