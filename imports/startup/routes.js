import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../ui/layouts/app-body.js';
import '../ui/pages/month-page.js';
import '../ui/pages/roomie-page.js';
import '../ui/pages/coronation-page.js';

FlowRouter.route('/roomie/:_id', {
  name: 'Roomie.show',
  action() {
    BlazeLayout.render('App_body', { main: 'Roomie_page' });
  },
});

FlowRouter.route('/coronation', {
  name: 'Coronation.show',
  action() {
    BlazeLayout.render('App_body', { main: 'Coronation_page' });
  },
});

FlowRouter.route('/:_year/:_month', {
  name: 'Month.show',
  action() {
    BlazeLayout.render('App_body', { main: 'Month_page' });
  },
});

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    const today = new Date();
    FlowRouter.go('Month.show', {_year: today.getFullYear(), _month: today.getMonth()+1});
  },
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    FlowRouter.go('App.home', {});
  },
};
