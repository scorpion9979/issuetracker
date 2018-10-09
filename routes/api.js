/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
require('dotenv').config();
const CONNECTION_STRING = process.env.DB;
mongoose.connect(CONNECTION_STRING);

var Schema = mongoose.Schema;
var issueSchema = new Schema({
  _id: {type: String, required: true},
  issue_title: {type: String, required: true},
  issue_text: {type: String, required: true},
  created_on: {type: String, required: true},
  updated_on: {type: String, required: true},
  created_by: {type: String, required: true},
  assigned_to: {type: String, required: false},
  open: {type: Boolean, required: true},
  status_text: {type: String, required: false},
});
var Issue = mongoose.model('Issue', issueSchema);

module.exports = function(app) {

  app.route('/api/issues/:project')

    .get(function(req, res) {
      var project = req.params.project;

    })

    .post(function(req, res) {
      var project = req.params.project;
      let newId = new ObjectId().toHexString();
      let nowDate = new Date().toISOString();
      let issueJson = {
        _id: newId,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_on: nowDate,
        updated_on: nowDate,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        open: true,
        status_text: req.body.status_text,
      };
      let newIssue = new Issue(issueJson);
      newIssue.save(function(error, doc) {
        if (error) {
          res.status(400)
             .send(error);
        } else {
          res.status(200)
             .send(doc);
        }
      });
    })

    .put(function(req, res) {
      var project = req.params.project;
      let id = req.body._id;
      let nowDate = new Date().toISOString();
      Issue.findByIdAndUpdate(id, {new: true}, function(err, issue) {
        issue.issue_title = req.body.issue_title || issue.issue_title;
        issue.issue_text = req.body.issue_text || issue.issue_text;
        issue.updated_on = nowDate;
        issue.created_by = req.body.created_by || issue.created_by;
        issue.assigned_to = req.body.assigned_to || issue.assigned_to;
        issue.open = req.body.open || issue.open;
        issue.status_text = req.body.status_text || issue.status_text;
        if (!req.body.issue_title &&
            !req.body.issue_text &&
            !req.body.created_by &&
            !req.body.assigned_to &&
            !req.body.open &&
            !req.body.status_text) {
         res.status(400)
            .send('no updated field sent');
       } else {
        issue.save(function(e, i) {
          if (e) {
            res.status(400)
               .send('could not update ' + id);
          } else {
            res.status(200)
               .send('successfully updated');
          }
        });
       }
      });
    })

    .delete(function(req, res) {
      var project = req.params.project;

    });
};
