var application = require('../models/application');
var models = require('../models');

// Display application create form on GET.
exports.application_create_get = function(req, res, next) {
    res.render('forms/application_form', { title: 'Create Application',  layout: 'layouts/detail'});
};

// Handle application create on POST.
exports.application_create_post = function(req, res, next) {
    models.Application.create({
        app_name: req.body.app_name,
        app_description: req.body.app_description
        }).then(function() {
            console.log("Application created successfully");
            res.redirect("/applications");
      });
};

// Handle application delete on POST.
exports.application_delete_post = function(req, res, next) {
    models.Application.destroy({
            where: {
              id: req.params.application_id
            }
          }).then(function() {
            res.redirect('/applications');
            console.log("Application deleted successfully");
          });
};

// Display application update form on GET.
exports.application_update_get = function(req, res, next) {
    console.log("ID is " + req.params.application_id);
    models.Application.findById(
            req.params.application_id
    ).then(function(application) {
           res.render('forms/application_form', { title: 'Update Application', application: application, layout: 'layouts/detail'});
           console.log("Application update get successful");
      });

};

// Handle application update on POST.
exports.application_update_post = function(req, res, next) {
    console.log("ID is " + req.params.application_id);
    models.Application.update(
    // Values to update
        {
          app_name: req.body.app_name,
          app_description: req.body.app_description
        },
      { // Clause
            where: 
            {
                id: req.params.application_id
            }
        }
     ).then(function() { 
            res.redirect("/applications");  
            console.log("Application updated successfully");
      });
    res.redirect("/applications");
};

// Display list of all applications.
exports.application_list = function(req, res, next) {
    models.Application.findAll(
            ).then(function(applications) {
              console.log("rendering Application list");
              res.render('pages/application_list', { title: 'Application List', applications: applications, layout: 'layouts/list'});
              console.log("Application list renders successfully");
            });
    
};

// Display detail page for a specific application.
exports.application_detail = function(req, res, next) {
    models.Application.findById(
            req.params.application_id, {
              include: [
                {
                  model: models.Document,
                  attributes: ['id', 'subject', 'description']
                }
              ]
            }
    ).then(function(application) {
            res.render('pages/application_detail', { title: 'Application Details', application: application, layout: 'layouts/detail'});
            console.log("Application details renders successfully");
    });

};