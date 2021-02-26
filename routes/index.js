var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
const urlEncodedParser = bodyParser.urlencoded({extended: false});


// Require our controllers.
var document_controller = require('../controllers/documentController');
var employee_controller = require('../controllers/employeeController');
var application_controller = require('../controllers/applicationController');
var type_controller = require('../controllers/typeController'); 
var category_controller = require('../controllers/categoryController');
var comment_controller = require('../controllers/commentController');


/// DOCUMENT ROUTES ///

// GET request for creating a document.
router.get('/document/create', document_controller.document_create_get);

// POST request for creating document.
router.post('/document/create', document_controller.document_create_post);

// POST request to delete document.
router.get('/document/:document_id/delete', document_controller.document_delete_post);

// GET request to update document.
router.get('/document/:document_id/update', document_controller.document_update_get);

// POST request to update document.
router.post('/document/:document_id/update', document_controller.document_update_post);

// GET request for one document.
router.get('/document/:document_id', document_controller.document_detail);

// GET request for list of all documents.
router.get('/documents', document_controller.document_list);

/// EMPLOYEE ROUTES ///

// GET request for creating employee. 
router.get('/employee/create', employee_controller.employee_create_get);

// POST request for creating employee.
router.post('/employee/create', employee_controller.employee_create_post);

// POST request to delete employee
router.get('/employee/:employee_id/delete', employee_controller.employee_delete_post);

// GET request to update employee.
router.get('/employee/:employee_id/update', employee_controller.employee_update_get);

// POST request to update employee.
router.post('/employee/:employee_id/update', employee_controller.employee_update_post);

// GET request for one employee.
router.get('/employee/:employee_id', employee_controller.employee_detail);

// GET request for list of all employees.
router.get('/employees', employee_controller.employee_list);


/// APPLICATION ROUTES ///

// GET request for creating application. 
router.get('/application/create', application_controller.application_create_get);

// POST request for creating application.
router.post('/application/create', application_controller.application_create_post);

// POST request to delete application
router.get('/application/:application_id/delete', application_controller.application_delete_post);

// GET request to update application
router.get('/application/:application_id/update', application_controller.application_update_get);

// POST request to update application.
router.post('/application/:application_id/update', application_controller.application_update_post);

// GET request for one application.
router.get('/application/:application_id', application_controller.application_detail);

// GET request for list of all applications.
router.get('/applications', application_controller.application_list);


/// TYPE ROUTES ///

// GET request for creating type. 
router.get('/type/create', type_controller.type_create_get);

// POST request for creating type.
router.post('/type/create', type_controller.type_create_post);

// POST request to delete type
router.get('/type/:type_id/delete', type_controller.type_delete_post);

// GET request to update type.
router.get('/type/:type_id/update', type_controller.type_update_get);

// POST request to update type.
router.post('/type/:type_id/update', type_controller.type_update_post);

// GET request for one type.
router.get('/type/:type_id', type_controller.type_detail);

// GET request for list of all types.
router.get('/types', type_controller.type_list);


// /// DEPARTMENT ROUTES ///

// // GET request for creating a department.
// router.get('/department/create', department_controller.department_create_get);

// // POST request for creating department.
// router.post('/department/create', department_controller.department_create_post);

// // POST request to delete department.
// router.get('/department/:department_id/delete', department_controller.department_delete_post);

// // GET request to update department.
// router.get('/department/:department_id/update', department_controller.department_update_get);

// // POST request to update department.
// router.post('/department/:department_id/update', department_controller.department_update_post);

// // GET request for one department.
// router.get('/department/:department_id', department_controller.department_detail);

// // GET request for list of all departments.
// router.get('/departments', department_controller.department_list);


/// Category ROUTES ///

// GET request for creating a Category. 
router.get('/category/create', category_controller.category_create_get);

// POST request for creating Category.
router.post('/category/create', category_controller.category_create_post);

// POST request to delete Category.
router.get('/category/:category_id/delete', category_controller.category_delete_post);

// GET request to update Category.
router.get('/category/:category_id/update', category_controller.category_update_get);

// POST request to update Category.
router.post('/category/:category_id/update', category_controller.category_update_post);

// GET request for one Category.
router.get('/category/:category_id', category_controller.category_detail);

// GET request for list of all Categories.
router.get('/categories', category_controller.category_list);


/// COMMENT ROUTES ///

// GET request for creating Comment.
router.get('/comment/create', comment_controller.comment_create_get);

// POST request for creating Comment.
router.post('/comment/create', comment_controller.comment_create_post);

// POST request to delete Comment
router.get('/comment/:comment_id/delete', comment_controller.comment_delete_post);

// GET request to update Comment.
router.get('/comment/:comment_id/update', comment_controller.comment_update_get);

// POST request to update Comment.
router.post('/comment/:comment_id/update', comment_controller.comment_update_post);

// GET request for one Comment.
router.get('/comment/:comment_id', comment_controller.comment_detail);

// GET request for list of all Comments.
router.get('/comments', comment_controller.comment_list);

// GET DocuTrack home page.
router.get('/', document_controller.index); 

// export all the router created
module.exports = router;
