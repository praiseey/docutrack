var Document = require('../models/document');
var models = require('../models');
var async = require('async');

const { body } = require('express-validator');
const { validationResult } = require('express-validator')

// Display document create form on GET.
exports.document_create_get = async function(req, res, next) {
        const employees = await models.Employee.findAll();
        const types = await models.Type.findAll();
        const applications = await models.Application.findAll();
        const categories = await models.Category.findAll();
        res.render('forms/document_form', { title: 'Create Document', employees: employees, types: types, applications: applications, categories: categories, layout: 'layouts/detail'});
        console.log("document form renders successfully");
};

// // Validation
// exports.validate = function(method) {
//   switch (method) {
//     case 'document_create_post': {
//       return [
//         body('subject', 'Subject field cannot be empty').isEmpty(),
//         body('description', 'Subject field cannot be empty').isEmpty(),
//         body('employee', 'Subject field cannot be empty').isEmpty(),
//         body('TypeId').isEmpty().isIn(['Internal', 'External']),
//         body('application', 'Subject field cannot be empty').isEmpty(),
//         body('category', 'Subject field cannot be empty').isEmpty()
//       ]
//     }
//   }
// }
// Handle document create on POST.
exports.document_create_post = async function(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    let status = 'Draft';
    const document = await models.Document.create({
          subject: req.body.subject,
          description: req.body.description,
          EmployeeId: req.body.employee_id,
          TypeId: req.body.type_id,
          ApplicationId: req.body.application_id,
          CategoryId: req.body.category_id,
          Status: status
      }).then(function() {
          console.log("Document created successfully");
          res.redirect('/documents');
    });

  } catch(error) {
    console.log('There was an error: ' + error);
    res.status(404).send(error);
  };
      
};

// Handle document delete on POST.
exports.document_delete_post = function(req, res, next) {
          models.Document.destroy({
            where: {
              id: req.params.document_id
            }
          }).then(function() {
            res.redirect('/documents');
            console.log("Document deleted successfully");
          });

 };

// Display document update form on GET.
exports.document_update_get = async function(req, res, next) {
        console.log("ID is " + req.params.document_id);
        const employees = await models.Employee.findAll();
        const applications = await models.Application.findAll();
        const types = await models.Type.findAll();
        const categories = await models.Category.findAll();
        models.Document.findById(
                req.params.document_id
        ).then(function(document) {
               // renders a document form
               res.render('forms/document_form', { title: 'Update Document', document: document, employees: employees, applications: applications, types: types, categories: categories, layout: 'layouts/detail'});
               console.log("Document update get successful");
          });
        
};

// Handle document update on POST.
exports.document_update_post = function(req, res, next) {
        console.log("ID is " + req.params.document_id);
        // logic to set document status
        let status = 'Draft';
        models.Document.update(
        // Values to update
            {
              subject: req.body.subject,
              description: req.body.description,
              TypeId: req.body.type_id,
              ApplicationId: req.body.application_id,
              CategoryId: req.body.category_id,
              Status: status
            },
          { // Clause
                where: 
                {
                    id: req.params.document_id
                }
            }
         ).then(function() { 
                res.redirect("/documents");  
                console.log("Document updated successfully");
          });
};

// Display detail page for a specific document.
exports.document_detail = function(req, res, next) {
        // const employees = await models.Employee.findAll();
        // const applications = await models.Application.findAll();
        // const types = await models.Type.findAll();
        // const categories = await models.Category.findAll();
        models.Document.findById(
                req.params.document_id, {
                  include: [
                    {
                      model: models.Employee,
                      attributes: ['id', 'first_name', 'last_name', 'role', 'department']
                    },
                    {
                      model: models.Type,
                      attributes: ['id', 'name']
                    },
                    {
                      model: models.Application,
                      attributes: ['id', 'name']
                    },
                    {
                      model: models.Category,
                      attributes: ['id', 'name']
                    }
                  ]
                }
        ).then(function(document) {
        // renders an inividual post details page
        res.render('pages/document_detail', { title: 'Document Details', document: document, layout: 'layouts/detail'} );
        console.log("Document details renders successfully...");
        });
};


// Display list of all documents.
exports.document_list = function(req, res, next) {
        models.Document.findAll(
        ).then(function(documents) {
          console.log("rendering document list");
          res.render('pages/document_list', { title: 'Document List', documents: documents, layout: 'layouts/list'} );
          console.log("Document list renders successfully...");
        });
        
};

// This is the blog homepage.
exports.index = function(req, res) {
      // find the count of posts in database
      models.Document.findAndCountAll(
      ).then(function(documentCount)
      {   
      models.Employee.findAndCountAll(
      ).then(function(employeeCount)
      {
      models.Application.findAndCountAll(
      ).then(function(applicationCount)
      {
      models.Type.findAndCountAll(
      ).then(function(typeCount)
      {
      models.Category.findAndCountAll(
      ).then(function(categoryCount)
      {
        res.render('pages/index', {
          title: 'Homepage', 
          documentCount: documentCount,
          employeeCount: employeeCount,
          applicationCount: applicationCount,
          typeCount: typeCount,
          categoryCount: categoryCount, 
          layout: 'layouts/main'
        });
        
        // res.render('pages/index_list_sample', { title: 'Post Details', layout: 'layouts/list'});
        // res.render('pages/index_detail_sample', { page: 'Home' , title: 'Post Details', layout: 'layouts/detail'});

      });
      });
      });
      });
      });
};


