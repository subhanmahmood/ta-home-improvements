var connection = require('../database.js')

module.exports = {
  addItem: function(req, res){
    console.log(req.body);
    var query = 'INSERT INTO tbljob SET ?';
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
    if(typeof req.query['type'] === 'string'){
      var query = 'SELECT * FROM tbljob INNER JOIN tblcustomer ON tbljob.idcustomer = tblcustomer.idcustomer AND tbljob.job_type = ?';
      connection.query(query, req.query['type'], function(error, results, fields){
        if ( error ) {
          res.send({ "status": 500, "error": error, "response": null })
        }else{
          res.send({ "status": 200, "error": null, "response": results });
        }
      })
    }else if(typeof req.query['status'] === 'string'){
      var query = 'SELECT * FROM tbljob INNER JOIN tblcustomer ON tbljob.idcustomer = tblcustomer.idcustomer AND tbljob.status = ?';
      connection.query(query, req.query['status'], function(error, results, fields){
        if ( error ) {
          res.send({ "status": 500, "error": error, "response": null })
        }else{
          res.send({ "status": 200, "error": null, "response": results });
        }
      })
    }else if(typeof req.query['customer'] === 'string'){                
      var query = 'SELECT * FROM tbljob INNER JOIN tblcustomer ON tbljob.idcustomer = tblcustomer.idcustomer';
      connection.query(query, function(error, results, fields){
        if ( error ) {
          res.send({ "status": 500, "error": error, "response": null })
        }else{
          res.send({ "status": 200, "error": null, "response": results });
        }
      })
    }else{                
      var query = 'SELECT * FROM tbljob';
      connection.query(query, function(error, results, fields){
        if ( error ) {
          res.send({ "status": 500, "error": error, "response": null })
        }else{
          res.send({ "status": 200, "error": null, "response": results });
        }
      })
    }    
  },
  findById: function(req, res){
    var id = parseInt(req.params.id);
    var query = 'SELECT * FROM tbljob INNER JOIN tblcustomer ON tbljob.idcustomer = tblcustomer.idcustomer AND tbljob.idjob = ?'
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
    var query = 'DELETE FROM tbljob WHERE idjob = ?';
    connection.query(query, id, function(error, results, fields) {
      if(error){
        res.send({ "status": 500, "error": error, "response": null })   
        console.log(error)     
      }else{
        res.send({ "status": 200, "error": null, "response": results })   
      }   
    })
  },
  findAndUpdateById: function(req, res){
    if(req.query[0] !== undefined){
      var keys = Object.keys(req.query)
      var query = `UPDATE tbljob.? SET ? WHERE idjob = ?`;
      var id = req.params.id
      var body = req.query[0]
      var key = keys[0]
      connection.query(query, [key, body, id], function(error, results, fields) {
        if ( error ) {
          res.send({ "status": 500, "error": error, "response": null })
          console.log(error)
        }else{
          res.send({ "status": 200, "error": null, "response": results})
        }
      });
    }else{
      var id = req.params.id;
      var body = req.body;
      console.log(req.body)
      var query = 'UPDATE tbljob SET ? WHERE idjob = ?';
      connection.query(query, [body, id], function(error, results, fields) {
        if ( error ) {
          res.send({ "status": 500, "error": error, "response": null })
          console.log(error)
        }else{
          res.send({ "status": 200, "error": null, "response": results})
        }
      });
    }
  },
  deleteAll: function(req, res){
    var query = 'DELETE FROM tbljob';
    connection.query(query, function(error, results, fields){
      if ( error ) {
        res.send({ "status": 500, "error": error, "response": null })
      }else{
        res.send({ "status": 200, "error": null, "response": results });
      }
    })
  }
} 