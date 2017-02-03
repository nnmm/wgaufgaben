import { Template } from 'meteor/templating';
 
import { Checkmarks } from '../../api/checkmarks.js';
import { task_list } from '../../definitions/tasks.js';

import './roomie-page.html';
import '../components/taskinput.js';

Template.Roomie_page.onCreated(function listsShowPageOnCreated() {
  this.getRoomieId = () => FlowRouter.getParam('_id');
});

Template.Roomie_page.helpers({
  roomie() {
  	return Template.instance().getRoomieId();
  },
  undoDisabled() {
    const justadded = Checkmarks.findOne(
  		{ createdAt: { $gte: new Date(new Date() - 1000*60*3) },
  		  checker: Template.instance().getRoomieId() },
  	    { sort: { createdAt: -1 } }
  	);
  	if (typeof(justadded) === "undefined") {
  		return true;
  	} else {
  		return false;
  	}
  },
  eventlist() {
  	let ts = Checkmarks.find({ checker: FlowRouter.getParam('_id') }, { sort: { createdAt: -1 } }).fetch();
  	const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
  	ts.forEach(function(e, ix, arr) {
  		const d = e.createdAt;
  		e.createdAt = days[d.getDay()-1] + ', ' + d.getDate() + '.' + (d.getMonth()+1) + ' um ' + d.getHours() + ':' + d.getMinutes();
  	});
  	return ts;
  },
  taskinputs: task_list,
});

Template.Roomie_page.events({
  'click #undo'(event, instance) {
  	const justadded = Checkmarks.findOne(
  		{ createdAt: { $gte: new Date(new Date() - 1000*60*3) },
  		  checker: instance.getRoomieId() },
  	    { sort: { createdAt: -1 } }
  	);
  	if (typeof(justadded) !== "undefined") {
  		console.log("Removing", justadded);
  		Checkmarks.remove(justadded._id);
  	};
  },
  'submit .custom-task'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();
    
    // Get value from form element
    const target = event.target;
    const cust_task = target.task.value;
    const cust_weight = target.weight.value;

    if (!cust_weight || !cust_task || !/^(\-|\+)?([0-9]+|Infinity)$/.test(cust_weight)) {
      console.log("Invalid custom task input");
      return;
    }
    // Insert a task into the collection
    Checkmarks.insert({
      checker: instance.getRoomieId(),
      task: cust_task,
      createdAt: new Date(),
      weight: Number(cust_weight),
    });
  
    // Clear form
    target.task.value = '';
    target.weight.value = '';
  },
});
