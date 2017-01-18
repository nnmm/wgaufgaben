import { Template } from 'meteor/templating';
 
import { Checkmarks } from '../../api/checkmarks.js';
 
import './taskinput.html';

Template.taskinput.onCreated(function() {
  this.getRoomieId = () => FlowRouter.getParam('_id');
});

Template.taskinput.helpers({
  marks() {
    const roomieId = Template.instance().getRoomieId();
    const taskCount = Checkmarks.find({checker: roomieId, task: this.name}).count();
    return "I".repeat(taskCount);
  },
});

Template.taskinput.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    Checkmarks.insert({
      checker: instance.getRoomieId(),
      task: this.name,
      createdAt: new Date(),
    });
  },
});