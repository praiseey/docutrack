var Comment = require('../models/category');

// Display comment create form on GET.
exports.comment_create_get = function(req, res, next) {

        res.render('forms/comment_form', { title: 'Create Comment', layout: 'layouts/detail'});
};

// Handle comment create on POST.
exports.comment_create_post = function(req, res, next) {
     models.Comment.create({
             comment_title: req.body.comment_title,
             comment_body: req.body.comment_body
     }).then(function(){
             console.log('Comment created successfully.');
                res.redirect("/comments");
     }).catch(error => {
             console.log('There was an error: ' + error);
             res.status(404).send(error);
     });
     
};

// Handle comment delete on POST.
exports.comment_delete_post = function(req, res, next) {
        models.Comment.destroy({
                where: {
                        id: req.params.comment_id
                }
        }).then(function() {
                res.redirect('/comments');
        }).catch(error => {
                console.log('There was an ' + error);
                res.status(404).send(error);
        });
 
};

// Display comment update form on GET.
exports.comment_update_get = function(req, res, next) {
        models.Comment.findById(
                req.params.comment_id, {
                        include: [
                                {
                                        model: models.Document
                                }
                        ]
                }
        ).then(function(comment) {
                res.render('forms/comment_form', { title: 'Update Comment',  comment: comment, layout: 'layouts/detail' });
        });
        
};

// Handle comment update on POST.
exports.comment_update_post = function(req, res, next) {
        models.Comment.update({
                comment_title: req.body.comment_title,
                comment_body: req.body.comment_body
        },
        {
                where: {
                        id: req.params.commentid
                }
        }).then(function() {
                console.log('Comment updated successfully.');
                res.redirect("/comments");
        }).catch(error => {
                console.log('There awas an error: ' + error);
        });
        
};

// Display list of all comments.
exports.comment_list = function(req, res, next) {
        models.Comment.findAll(
        ).then(function(comments) {
                res.render('pages/comment_list', { title: 'Comment List', comments: comments, layout: 'layouts/list'} );
        });
        
};

// Display detail page for a specific comment.
exports.comment_detail = function(req, res, next) {
        // constroller logic to display a single comment
        
        // renders an inividual comment details page
        res.render('pages/comment_detail', { title: 'Comment Details',  layout: 'layouts/detail'} );
};

 