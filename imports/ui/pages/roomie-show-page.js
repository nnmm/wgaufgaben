import { Template } from 'meteor/templating';
 
import { Checkmarks } from '../../api/checkmarks.js';
import { task_list } from '../../definitions/tasks.js';

import './roomie-show-page.html';
import '../components/taskinput.js';

Template.Roomie_show_page.onCreated(function listsShowPageOnCreated() {
  this.getRoomieId = () => FlowRouter.getParam('_id');
});

Template.Roomie_show_page.helpers({
  tasks() {
    return Checkmarks.find({}, { sort: { createdAt: -1 } });
  },
  taskinputs: task_list,
});