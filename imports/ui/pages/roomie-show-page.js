import { Template } from 'meteor/templating';
 
import { Checkmarks } from '../../api/checkmarks.js';
import { task_list } from '../../definitions/tasks.js';

import './roomie-show-page.html';
import '../components/taskinput.js';

Template.Roomie_show_page.onCreated(function listsShowPageOnCreated() {
  this.getRoomieId = () => FlowRouter.getParam('_id');
});

Template.Roomie_show_page.helpers({
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
  		e.createdAt = days[d.getDay()] + ', ' + d.getDate() + '.' + (d.getMonth()+1) + ' um ' + d.getHours() + ':' + d.getMinutes();
  	});
  	return ts;
  },
  taskinputs: task_list,
});

Template.Roomie_show_page.events({
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
});

