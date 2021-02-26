var Employee = require('../models/employee');
var models = require('../models');
var async = require('async');
const bodyParser = require('body-parser');
// const urlencodedParser = bodyParser.urlencoded({extended:false});
// const { body, validationResult } = require('express-validator');

// Display employee create form on GET.
exports.employee_create_get = async function(req, res, next) {
        res.render('forms/employee_form', { title: 'Create Employee', layout: 'layouts/detail'});
};

// Display employee create form on POST.
exports.employee_create_post = function(req, res, next) {
        models.Employee.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                username: req.body.username,
                // password: req.body.password,
                role: req.body.role,
                department: req.body.department,
                phone: req.body.phone
        }).then(function() {
                res.redirect('/employees');
        }).catch(error => {
                console.log('There was an error: ' + error);
                res.status(404).send(error);
        })
};

// Handle employee delete on POST.
exports.employee_delete_post = function(req, res, next) {
        models.Employee.destroy({
            where: {
              id: req.params.employee_id
            }
          }).then(function() {
            res.redirect('/employees');
            console.log("Employee deleted successfully");
          });
        
};

// Display employee update form on GET.
exports.employee_update_get = async function(req, res, next) {
        console.log("ID is " + req.params.employee_id);
        const departments = await models.Department.findAll();
        models.Employee.findById(
                req.params.employee_id
        ).then(function(employee) {
               // renders a post form
               res.render('forms/employee_form', { title: 'Update Employee', employee: employee, layout: 'layouts/detail'});
               console.log("Employee update get successful");
          });
};

// Handle employee update on POST.
exports.employee_update_post = function(req, res, next) {
        console.log("ID is " + req.params.employee_id);
        models.Employee.update(
        // Values to update
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                // password: req.body.password,
                role: req.body.role,
                department: req.body.department,
                phone: req.body.phone
            },
          { // Clause
                where: 
                {
                    id: req.params.employee_id
                }
        }
         ).then(function() { 
                res.redirect("/employees");  
                console.log("Employee updated successfully");
          });
};

// Display list of all employees.
exports.employee_list = function(req, res, next) {
        // GET controller logic to list all employees
        models.Employee.findAll(
        ).then(function(employees) {
        // renders a post list page
        console.log("rendering employee list");
        res.render('pages/employee_list', { title: 'Employee List', employees: employees, layout: 'layouts/list'} );
        console.log("Employee list renders successfully");
        });
};

// Display detail page for a specific employee.
exports.employee_detail = function(req, res, next) {
        models.Employee.findById(
                req.params.employee_id, {
                        include: [
                                {
                                        model: models.Document,
                                        attributes: ['id', 'subject']
                                }
                        ]
                }
        ).then(function(employee) {
        // renders an inividual author details page
        res.render('pages/employee_detail', { title: 'Employee Details', employee: employee, layout: 'layouts/detail'} );
        // res.render('pages/employee_detail', { title: 'Employee Details', categories: categories, employee: employee, moment: moment, layout: 'layouts/detail'} );
        console.log("Employee details renders successfully");
        });
};
