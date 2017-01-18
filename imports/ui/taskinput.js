import { Template } from 'meteor/templating';
 
import { Checkmarks } from '../api/checkmarks.js';
 
import './taskinput.html';

Template.taskinput.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    console.log(this);
    Checkmarks.insert({
      checker: "Niko",
      task: this.name,
      createdAt: new Date(),
    });
  },
});