import { Template } from 'meteor/templating';
 
import { Checkmarks } from '../../api/checkmarks.js';
import { task_list } from '../../definitions/tasks.js';

import './overview-page.html';

Template.Overview_page.helpers({
  tasks() {
    return Checkmarks.find({}, { sort: { createdAt: -1 } });
  },
  overview_table() {
  	return [
  		{ name: "a", roomie_scores: [1, 0, 0, 0], },
  		{ name: "b", roomie_scores: [0, 1, 0, 0], },
  		{ name: "c", roomie_scores: [0, 0, 1, 0], },
  		{ name: "d", roomie_scores: [0, 0, 0, 1], },
  	];
  	/* The following is hideous and displays wrong numbers if refreshed
  	 * (but not if returning to the overview page from a roomie page)
    const allmarks = Checkmarks.find({});
    let marks = [];
    const roomieIx = {
    	Felix: 0,
    	Veronika: 1,
    	Niko: 2,
    	Stefan: 3,
	};
    task_list.forEach(function(cur_task) {
    	marks.push({
	    	roomie_scores: [0, 0, 0, 0],
	    	name: cur_task.name,
    	});
    });
    marks.push({
    	roomie_scores: [0, 0, 0, 0],
    	name: "Eigene",
	});
    allmarks.forEach(function(elem) {
    	let ix = marks.findIndex(function(element, index, arr) {
    		return element.name === elem.task;
    	});
    	// Eigene
    	if (ix === -1) {
    		ix = marks.length - 1;
    	}
    	const jx = roomieIx[elem.checker];
    	marks[ix]['roomies'][jx] += 1;
    });
    let marks = marks.map(function(e, ix, arr) {
    	return e['roomies'].map(function(count, jx, array) {
			return "I".repeat(count['count']);
    	});
    });
    console.log(marks);
    return marks; */
  },
});