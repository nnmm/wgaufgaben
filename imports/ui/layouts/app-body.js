/* global alert */

import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';

import { Checkmarks } from '../../api/checkmarks.js';
import { findInMonth } from '../../api/methods.js';

import './app-body.html';
import '../components/banderole-top.js';
import '../components/banderole-bottom.js';

Template.App_body.helpers({
  curMonthURL() {
    const today = new Date();
    return '/' + today.getFullYear() + '/' + (today.getMonth()+1);
  },
  disconnected() {
    return Meteor.status().status !== "connected";
  },
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
    const taskCount = findInMonth(roomie);
    let total = 0;
    taskCount.forEach(function(check) {
      total += check.weight || 1;
    });
    return total;
  },
  needAiring() {
    let today = new Date();
    today.setHours(17, 0, 0, 0);
    const aired = Checkmarks.findOne(
      { createdAt: { $gte: today },
        task: "Wohnung lüften" },
        { sort: { createdAt: -1 } }
    );
    if (typeof(aired) === "undefined") {
      return true;
    } else {
      return false;
    }
  },
});

