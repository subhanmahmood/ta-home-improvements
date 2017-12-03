var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', source: 'dashboard' });
});

router.get('/updatecustomer', function(req, res, next) {
	res.render('updatecustomer', {title: 'Update Customer'});
})

router.get('/customers', function(req, res, next) {
	res.render('index', {title: 'Customers', source: 'customers'})
});

router.get('/edit/customer/:id', function(req, res, next) {
	res.render('index', {title: 'Edit Customer', source: 'editCustomer', id: req.params.id})
})

router.get('/jobs', function(req, res, next) {
	res.render('index', {title: 'Jobs', source: 'jobs'})
})

router.get('/parts', function(req, res, next) {
	res.render('index', {title: 'Parts', source: 'parts'});
})

module.exports = router;
