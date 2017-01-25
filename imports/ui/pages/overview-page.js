import { Template } from 'meteor/templating';
 
import { Checkmarks } from '../../api/checkmarks.js';
import { task_list } from '../../definitions/tasks.js';

import './overview-page.html';

Template.Overview_page.helpers({
  overview_table() {
    const roomieIx = {
    	Felix: 0,
    	Veronika: 1,
    	Niko: 2,
    	Stefan: 3,
	};

    // build empty rows
    let rows = [];
    task_list.forEach(function(cur_task, ix, arr) {
    	rows.push({
	    	roomie_scores: [{n: 0}, {n: 0}, {n: 0}, {n: 0}],
	    	name: cur_task.name,
    	});
    });
    /* rows.push({
    	roomie_scores: [{n: 0}, {n: 0}, {n: 0}, {n: 0}],
    	name: "Eigene",
	}); */

    const marks = Checkmarks.find({}).fetch();

    marks.forEach(function(mark, m_ix, m_arr) {
    	let ix = rows.findIndex(function(row, r_ix, r_arr) {
    		return row.name === mark.task;
    	});
    	if (ix !== -1) {
    		const jx = roomieIx[mark.checker];
    		rows[ix]['roomie_scores'][jx]['n'] += 1;
    	}
    });

    // lines
    rows.forEach(function(row, r_ix, r_arr) {
    	row['roomie_scores'].forEach(function(cell, c_ix, c_arr) {
    		cell['marks'] = "I".repeat(cell['n']);
    	});
    });
    return rows;
  },
});