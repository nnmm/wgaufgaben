import { Template } from 'meteor/templating';
 
import { Checkmarks } from '../../api/checkmarks.js';
import { task_list } from '../../definitions/tasks.js';
import { findInMonth } from '../../api/methods.js';
import './taskinput.html';

Template.taskinput.onCreated(function() {
  this.getRoomieId = () => FlowRouter.getParam('_id');
});

Template.taskinput.helpers({
  marks() {
    const roomieId = Template.instance().getRoomieId();
    const taskCount = findInMonth(roomieId, this.name).count();
    return "I".repeat(taskCount);
  },
  isStandard(type) {
    return type === "standard";
  },
});

Template.taskinput.events({
  'click button'(event, instance) {
    event.preventDefault();
    // increment the counter when button is clicked
    Checkmarks.insert({
      checker: instance.getRoomieId(),
      task: this.name,
      createdAt: new Date(),
      weight: this.weight,
    });
  },
});