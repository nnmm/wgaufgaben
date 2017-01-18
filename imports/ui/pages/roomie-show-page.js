import { Template } from 'meteor/templating';
 
import { Checkmarks } from '../../api/checkmarks.js';

import './roomie-show-page.html';
import '../components/taskinput.js';

Template.Roomie_show_page.onCreated(function listsShowPageOnCreated() {
  this.getRoomieId = () => FlowRouter.getParam('_id');
});

Template.Roomie_show_page.helpers({
  tasks() {
    return Checkmarks.find({}, { sort: { createdAt: -1 } });
  },
  total() {
    const roomieId = Template.instance().getRoomieId();
  	const taskCount = Checkmarks.find({checker: roomieId, task: this.name}).count();
  	return "0 (Dummy)";
  },
  taskinputs: [
    { name: "Biomüll", weight: 1 },
    { name: "Restmüll", weight: 2 },
    { name: "WG-Wäsche", weight: 4 },
    { name: "Handtücher", weight: 1 },
    { name: "Spülmaschine", weight: 1 },
    { name: "Einkaufen", weight: 2 }
  ],
});