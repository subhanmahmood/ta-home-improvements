var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'TA Home Improvements', source: 'dashboard' });
});

router.get('/jobs', function(req, res, next) {
	res.render('index', {title: 'Jobs', source: 'jobs'})
})

router.get('/jobs/:id', function(req, res, next){
	res.render('singleItem', {title: 'Job', source: 'job', id: req.params.id})
})

router.get('/jobs/:id/edit', function(req, res, next) {
	res.render('singleItem', {title: 'Edit Customer', source: 'editCustomer', id: req.params.id})
})

router.get('/customers', function(req, res, next) {
	res.render('index', {title: 'Customers', source: 'customers'})
});

router.get('/customers/:id/edit', function(req, res, next) {
	res.render('singleItem', {title: 'Edit Customer', source: 'editCustomer', id: req.params.id})
})

router.get('/parts', function(req, res, next) {
	res.render('index', {title: 'Parts', source: 'parts'});
})

router.get('/appointments', function(req, res, next){
	res.render('index', {title: 'Appointments', source: 'appointments'});
})

router.get('/finances', function(req, res, next){
	res.render('index', {title: 'Finances', source: 'finances'})
})

module.exports = router;
