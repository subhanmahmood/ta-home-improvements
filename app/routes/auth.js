var authController = require('../controllers/authcontroller.js');
 
module.exports = function(app, passport) {
    app.get('/logout',authController.logout);
    app.get('/dashboard',isLoggedIn, authController.dashboard);
    app.get('/signup', function(req, res, next) {
        res.render('index', { title: 'TA Home Improvements', source: 'signup' });
    });
    app.get('/signin', function(req, res, next) {
        res.render('index', { title: 'TA Home Improvements', source: 'signin' });
    });
    app.get('/', isLoggedIn, function(req, res, next) {
        res.render('index', { title: 'TA Home Improvements', source: 'dashboard' });
    });
    
    app.get('/jobs', isLoggedIn, function(req, res, next) {
        res.render('index', {title: 'Jobs', source: 'jobs'})
    })
    
    app.get('/jobs/:id', function(req, res, next){
        res.render('singleItem', {title: 'Job', source: 'job', id: req.params.id})
    })
    
    app.get('/jobs/:id/invoice', isLoggedIn, function(req, res, next){
        res.render('singleItem', {title: 'Invoice', source: 'invoice', id: req.params.id})
    })
    
    app.get('/jobs/:id/edit', isLoggedIn, function(req, res, next) {
        res.render('singleItem', {title: 'Edit Customer', source: 'editCustomer', id: req.params.id})
    })
    
    app.get('/customers', isLoggedIn, function(req, res, next) {
        res.render('index', {title: 'Customers', source: 'customers'})
    });
    
    app.get('/customers/:id/edit', isLoggedIn, function(req, res, next) {
        res.render('singleItem', {title: 'Edit Customer', source: 'editCustomer', id: req.params.id})
    })
    
    app.get('/parts', isLoggedIn, function(req, res, next) {
        res.render('index', {title: 'Parts', source: 'parts'});
    })
    
    app.get('/appointments', isLoggedIn, function(req, res, next){
        res.render('index', {title: 'Appointments', source: 'appointments'});
    })
    
    app.get('/finances', isLoggedIn, function(req, res, next){
        res.render('index', {title: 'Finances', source: 'finances'})
    });

    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/', 
        failureRedirect: '/signup'
    }));

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/', 
        failureRedirect: '/jobs'
    }));

    
    function isLoggedIn(req, res, next) {    
        if (req.isAuthenticated())        
            return next();            
        res.redirect('/signin');    
    }
}
