//import express and mysql driver into file
var express = require('express');
var mysql = require('mysql');
//create express router object
var router = express.Router();

//initialize database connection
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '*****',
    database: 'app'
});

//API route to fetch all customers
router.get('/api/customer', function(req, res, next){
    var query = 'SELECT * FROM tblcustomer';
    connection.query(query, function(error, results, fields){
      if ( error ) {
        res.send({ "status": 500, "error": error, "response": null })
      };
      res.send({ "status": 200, "error": null, "response": results });
    })
})

import React from 'react';

class ChildComponent extends React.Component {
    render(){
        return(
            <p>Hello {this.props.name}!</p>
        )
    }
}

class ParentComponent extends React.Component {
    render(){
        return(
            <ChildComponent name="Subhan"/>
        )
    }
}

class SampleComponent extends React.Component {
    render(){
        return(
            <p>Hello World!</p>
        )
    }
}