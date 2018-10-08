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

    })

    .delete(function(req, res) {
      var project = req.params.project;

    });
};
