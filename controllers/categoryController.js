var Category = require('../models/category');
var models = require('../models');

// Display category create form on GET.
exports.category_create_get = function(req, res, next) {
        res.render('forms/category_form', { title: 'Create Category',  layout: 'layouts/detail'});
};

// Handle category create on POST.
exports.category_create_post = function(req, res, next) {
        models.Category.create({
                category_name: req.body.category_name,
                category_description: req.body.category_description
            }).then(function() {
                console.log("Category created successfully");
                res.redirect("/categories");
          });
};

// Handle category delete on POST.
exports.category_delete_post = function(req, res, next) {
        models.Category.destroy({
                where: {
                  id: req.params.category_id
                }
              }).then(function() {
                res.redirect('/categories');
                console.log("Category deleted successfully");
              });
};

// Display category update form on GET.
exports.category_update_get = function(req, res, next) {
        console.log("ID is " + req.params.category_id);
        models.Category.findById(
                req.params.category_id
        ).then(function(category) {
               res.render('forms/category_form', { title: 'Update Category', category: category, layout: 'layouts/detail'});
               console.log("Category update get successful");
          });

};

// Handle category update on POST.
exports.category_update_post = function(req, res, next) {
        console.log("ID is " + req.params.category_id);
        models.Category.update(
        // Values to update
            {
                category_name: req.body.category_name,
                category_description: req.body.category_description
            },
          { // Clause
                where: 
                {
                    id: req.params.category_id
                }
            }
         ).then(function() { 
                res.redirect("/categories");  
                console.log("Category updated successfully");
          });
        res.redirect("/categories");
};

// Display list of all categories.
exports.category_list = function(req, res, next) {
        models.Category.findAll(
                ).then(function(categories) {
                  console.log("rendering category list");
                  res.render('pages/category_list', { title: 'Category List', categories: categories, layout: 'layouts/list'});
                  console.log("Categories list renders successfully");
                });
        
};

// Display detail page for a specific category.
exports.category_detail = function(req, res, next) {
        models.Category.findById(
                req.params.category_id, {
                        include: [
                                {
                                        model: models.Document,
                                        attributes: ['id', 'subject', 'description']
                                }
                                
                        ]
                }
        ).then(function(category) {
                res.render('pages/category_detail', { title: 'Category Details', category: category, layout: 'layouts/detail'});
                console.log("Category details renders successfully");
        });

};

 