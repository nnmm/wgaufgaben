import { Template } from 'meteor/templating';
 
import { Checkmarks } from '../../api/checkmarks.js';
import { task_list, taskIndex } from '../../definitions/tasks.js';

import './overview-page.html';
import '../components/roomie-table.js';

const roomieIx = {
    Felix: 0,
    Veronika: 1,
    Niko: 2,
    Stefan: 3,
};

Template.Overview_page.helpers({
  tables() {
    // build empty rows
    let standard = [];
    task_list.forEach(function(cur_task, ix, arr) {
        standard.push({
            roomie_scores: [{n: 0}, {n: 0}, {n: 0}, {n: 0}],
            name: cur_task.name,
        });
    });
    let custom = [];
    const marks = Checkmarks.find({}).fetch();

    marks.forEach(function(mark, m_ix, m_arr) {
      const jx = roomieIx[mark.checker];
      const ix = taskIndex[mark.task];
      if (typeof(ix) !== 'undefined') {
        standard[ix]['roomie_scores'][jx]['n'] += 1;
      } else {
        const jx = roomieIx[mark.checker];
        custom.push({
          roomie_scores: [{entry: ''}, {entry: ''}, {entry: ''}, {entry: ''}],
          name: mark.task,
        });
        custom[custom.length-1]['roomie_scores'][jx]['entry'] = mark.weight;
      }
    });

    // lines
    standard.forEach(function(row, r_ix, r_arr) {
        row['roomie_scores'].forEach(function(cell, c_ix, c_arr) {
            cell['entry'] = "I".repeat(cell['n']);
        });
    });
    return {'standard': standard, 'custom': custom};
  },
  overview_table() {
    // build empty rows
    let rows = [];
    task_list.forEach(function(cur_task, ix, arr) {
        rows.push({
            roomie_scores: [{n: 0}, {n: 0}, {n: 0}, {n: 0}],
            name: cur_task.name,
        });
    });

    const marks = Checkmarks.find({}).fetch();
    marks.forEach(function(mark, m_ix, m_arr) {
        let ix = rows.findIndex(function(row, r_ix, r_arr) {
            return row.name === mark.task;
        });
        if (ix !== -1) {
            const jx = roomieIx[mark.checker];
            custom[ix]['roomie_scores'][jx]['n'] += 1;
        }
    });

    // lines
    standard.forEach(function(row, r_ix, r_arr) {
        row['roomie_scores'].forEach(function(cell, c_ix, c_arr) {
            cell['marks'] = "I".repeat(cell['n']);
        });
    });
  },
  custom_table() {
    let rows = [];
    const marks = Checkmarks.find({}).fetch();
    marks.forEach(function(mark, m_ix, m_arr) {
      let ix = task_list.findIndex(function(row, r_ix, r_arr) {
        return row.name === mark.task;
      });
      if (ix === -1) {
        const jx = roomieIx[mark.checker];
        rows.push({
          roomie_scores: [{n: ''}, {n: ''}, {n: ''}, {n: ''}],
          name: mark.task,
        });
        rows[rows.length-1]['roomie_scores'][jx]['n'] = mark.weight;
      }
    });
    return rows;
  },
});