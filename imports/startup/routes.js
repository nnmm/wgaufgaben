import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../ui/layouts/app-body.js';
import '../ui/pages/overview-page.js';
import '../ui/pages/roomie-show-page.js';
import '../ui/pages/coronation-page.js';

FlowRouter.route('/roomie/:_id', {
  name: 'Roomie.show',
  action() {
    BlazeLayout.render('App_body', { main: 'Roomie_show_page' });
  },
});

FlowRouter.route('/coronation', {
  name: 'Coronation.show',
  action() {
    BlazeLayout.render('App_body', { main: 'Coronation_page' });
  },
});

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'Overview_page' });
  },
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'Overview_page' });
  },
};
