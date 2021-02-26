var Type = require('../models/type');
var models = require('../models');

// Display type create form on GET.
exports.type_create_get = function(req, res, next) {
        res.render('forms/type_form', { title: 'Create Type',  layout: 'layouts/detail'});
};

// Handle type create on POST.
exports.type_create_post = function(req, res, next) {
        models.Type.create({
                type_name: req.body.type_name,
                type_description: req.body.type_description
            }).then(function() {
                console.log("type created successfully");
                res.redirect("/types");
          });
};

// Handle type delete on POST.
exports.type_delete_post = function(req, res, next) {
        models.Type.destroy({
                where: {
                  id: req.params.type_id
                }
              }).then(function() {
                res.redirect('/types');
                console.log("Type deleted successfully");
              });
};

// Display type update form on GET.
exports.type_update_get = function(req, res, next) {
        console.log("ID is " + req.params.type_id);
        models.Type.findById(
                req.params.type_id
        ).then(function(type) {
               res.render('forms/type_form', { title: 'Update Type', type: type, layout: 'layouts/detail'});
               console.log("Type update get successful");
          });

};

// Handle type update on POST.
exports.type_update_post = function(req, res, next) {
        console.log("ID is " + req.params.type_id);
        models.Type.update(
        // Values to update
            {
                type_name: req.body.type_name,
                type_description: req.body.type_description
            },
          { // Clause
                where: 
                {
                    id: req.params.type_id
                }
            }
         ).then(function() { 
                res.redirect("/types");  
                console.log("Type updated successfully");
          });
        res.redirect("/types");
};

// Display list of all types.
exports.type_list = function(req, res, next) {
        models.Type.findAll(
                ).then(function(types) {
                  console.log("rendering type list");
                  res.render('pages/type_list', { title: 'Type List', types: types, layout: 'layouts/list'});
                  console.log("Type list renders successfully");
                });
        
};

// Display detail page for a specific type.
exports.type_detail = function(req, res, next) {
        models.Type.findById(
                req.params.type_id, {
                        include: [
                                {
                                        model: models.Document,
                                        attributes: ['id', 'subject', 'description']
                                }
                        ]
                }
        ).then(function(type) {
                res.render('pages/type_detail', { title: 'Type Details', type: type, layout: 'layouts/detail'});
                console.log("Type details renders successfully");
        });

};
 