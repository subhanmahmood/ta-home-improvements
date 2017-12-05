var express = require( 'express' )
var router = express.Router( )
var controllers = require('../controllers');

router.get( '/:resource', function( req, res, next ) {
  var resource = req.params.resource;
  var controller = controllers[resource];
  controller.find(req, res);
});

router.get( '/:resource/:id', function( req, res, next ) {
  var resource = req.params.resource;
  var controller = controllers[resource];
  controller.findById(req, res);
});

router.put( '/:resource/:id', function( req, res, next ) {
  var resource = req.params.resource
  var controller = controllers[resource];
  controller.findAndUpdateById(req, res);
})

router.post( '/:resource', function( req, res, next ) {
  var resource = req.params.resource
  var controller = controllers[resource];
  controller.addItem(req, res);
})

router.delete('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];
  controller.deleteById(req, res);
})


module.exports = router;