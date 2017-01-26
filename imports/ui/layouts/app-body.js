/* global alert */

import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';

import { Checkmarks } from '../../api/checkmarks.js';

import './app-body.html';
import '../components/banderole-top.js';
import '../components/banderole-bottom.js';


Template.App_body.helpers({
  roomies: [
    { name: "Felix" },
    { name: "Veronika" },
    { name: "Niko" },
    { name: "Stefan" },
  ],
  activeRoomieClass(roomie) {
    const active = ActiveRoute.name('Roomie.show')
      && FlowRouter.getParam('_id') === roomie.name;
    return active && 'active';
  },
  total(roomie) {
    const taskCount = Checkmarks.find({checker: roomie});
    let total = 0;
    taskCount.forEach(function(check) {
      total += check.weight || 1;
    });
    return total;
  },
});

