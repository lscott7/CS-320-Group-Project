import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Thread } from '../../api/thread/thread.js';
import { Reply } from '../../api/reply/reply.js';

/* eslint-disable object-shorthand, no-unused-vars */

Template.Thread_Page.events({
  'click .edit'() {
    let doc = Thread.findOne(FlowRouter.getParam('_id'));
    FlowRouter.go('Edit_Stuff_Page', { _id: doc._id });
  },
  'click .delete'() {
    let doc = Thread.findOne(FlowRouter.getParam('_id'));
    Thread.remove(doc._id);
    FlowRouter.go('List_Stuff_Page');
  },
  'click .reply'() {
    let doc = Thread.findOne(FlowRouter.getParam('_id'));
    FlowRouter.go('Add_Reply_Page', { _id: doc._id });
  },
});

Template.Thread_Page.helpers({
  getDoc() {
    return Thread.findOne(FlowRouter.getParam('_id'));
  },
  isOwner() {
    let doc = Thread.findOne(FlowRouter.getParam('_id'));
    return ( doc.owner === Meteor.userId() );
  },
  threadCollection() {
    return Thread;
  },
  replyList() {
    let doc = Thread.findOne(FlowRouter.getParam('_id'));
    return Reply.find({ threadID: doc._id });
  },
});