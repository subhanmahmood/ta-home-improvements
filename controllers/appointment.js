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
    const keys = Object.keys(req.query)
    var items = new Array()
    if(keys.length > 0){
      var queryStr = 'SELECT * FROM tblappointment '
      if('customer' in req.query && keys.length === 1){
        queryStr = queryStr + "INNER JOIN tblcustomer ON tblappointment.idcustomer = tblcustomer.idcustomer"
      }else if('customer' in req.query && keys.length !== 1){
        queryStr = queryStr + "INNER JOIN tblcustomer ON tblappointment.idcustomer = tblcustomer.idcustomer"
        queryStr = queryStr + " AND "
        for (var i=keys.length-1; i>=0; i--) {
          if (keys[i] === 'customer') {
              keys.splice(i, 1);
          }
        }
        for(var i = 0; i < keys.length; i++){
          var key = keys[i]
          var item = req.query[key]
          if(i === keys.length - 1){
            queryStr = queryStr + key + " = ?"
          }else{  
            queryStr = queryStr + key + " = ? AND "
          }
          items.push(item)                     
        }
      }else{
        queryStr = queryStr + " WHERE "
        for(var i = 0; i < keys.length; i++){
          var key = keys[i]
          var item = req.query[key]
          if(i === keys.length - 1){
            queryStr = queryStr + key + " = ?"
          }else{  
            queryStr = queryStr + key + " = ? AND "
          }
          items.push(item)  
        }         
      }     
      var query = connection.query(queryStr, items, function(error, results, fields){
        if ( error ) {
          res.send({ "status": 500, "error": error, "response": null })
        }else{
          res.send({ "status": 200, "error": null, "response": results });
        }
      })
    }else{
      var query = 'SELECT * FROM tblappointment'
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