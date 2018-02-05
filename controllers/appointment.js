var connection = require('../database.js')

module.exports = {
  addItem: function(req, res){
    console.log(req.body);
    var query = 'INSERT INTO tblappointment SET ?';
    connection.query(query, req.body, function(error, results, fields){
      if (error) {
        console.log(error)
        res.send({ "status": 500, "error": error, "response": null })
      }else{
        res.send({ "status": 200, "error": null, "response": results });
      }
    })
  },
  find: function(req, res){
    if(typeof req.query['date'] === 'string'){
      var query = 'SELECT * FROM tblappointment INNER JOIN tblcustomer on tblappointment.idcustomer = tblcustomer.idcustomer AND tblappointment.date = ?'
      connection.query(query, req.query['date'], function(error, results, fields){
        if ( error ) {
          res.send({ "status": 500, "error": error, "response": null })
        }else{
          res.send({ "status": 200, "error": null, "response": results });
        }
      })
    } else if(typeof req.query['customer'] === 'string'){
      var query = 'SELECT * FROM tblappointment INNER JOIN tblcustomer ON tblappointment.idcustomer = tblcustomer.idcustomer'
      connection.query(query, function(error, results, fields){
        if ( error ) {
          res.send({ "status": 500, "error": error, "response": null })
        }else{
          res.send({ "status": 200, "error": null, "response": results });
        }
      })
    } else {
      var query = 'SELECT * FROM tblappointment';
      connection.query(query, function(error, results, fields){
        if ( error ) {
          res.send({ "status": 500, "error": error, "response": null })
        }else{
          res.send({ "status": 200, "error": null, "response": results });}
      })
    }
    
  },
  findById: function(req, res){
    var id = parseInt(req.params.id);
    var query = 'SELECT *  FROM tblappointment WHERE idappointment = ?';
    connection.query(query, id, function(error, results, fields){
      if ( error ) {
        res.send({ "status": 500, "error": error, "response": null })
      }else{
        res.send({ "status": 200, "error": null, "response": results });
      }
   
    })
  },
  deleteById(req, res){
    var id = req.params.id;
    var query = 'DELETE FROM tblappointment WHERE idappointment = ?';
    connection.query(query, id, function(error, results, fields) {
      if(error){
        console.log(error)
        res.send({ "status": 500, "error": error, "response": null })        
      }else{
        res.send({ "status": 200, "error": null, "response": results })    
      }  
    })
  },
  findAndUpdateById: function(req, res){
    var id = req.params.id;
    var body = req.body;
    var query = 'UPDATE tblappointment SET ? WHERE idappointment = ?';
    connection.query(query, [body, id], function(error, results, fields) {
      if ( error ) {
        res.send({ "status": 500, "error": error, "response": null })
      }else{
        res.send({ "status": 500, "error": null, "response": results})
      }
    });
  },
  deleteAll: function(req, res){
    var query = 'DELETE FROM tblappointment';
    connection.query(query, function(error, results, fields){
      if ( error ) {
        res.send({ "status": 500, "error": error, "response": null })
      }else{
        res.send({ "status": 200, "error": null, "response": results });
      }
    })
  }
} 