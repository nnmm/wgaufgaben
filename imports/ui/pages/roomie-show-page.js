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

Template.Roomie_show_page.events({
  'click button'(event, instance) {
  	const bla = Checkmarks.findOne(
  		{ createdAt: { $gte: new Date(new Date() - 1000*60*3) },
  		  checker: instance.getRoomieId() },
  	    { sort: { createdAt: -1 } }
  	);
  	console.log(bla);

    // increment the counter when button is clicked
    /*
    Checkmarks.insert({
      checker: instance.getRoomieId(),
      task: this.name,
      createdAt: new Date(),
      weight: this.weight,
    });
    */
  },
});

