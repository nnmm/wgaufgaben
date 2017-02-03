import { Template } from 'meteor/templating';
 
import { Checkmarks } from '../../api/checkmarks.js';
import { getMonth, getYear, findInMonth } from '../../api/methods.js';
import { task_list, taskIndex } from '../../definitions/tasks.js';

import './month-page.html';
import '../components/roomie-table.js';

const roomieIx = {
    Felix: 0,
    Veronika: 1,
    Niko: 2,
    Stefan: 3,
};

Template.Month_page.helpers({
  year() {
    return getYear();
  },
  month() {
    return ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"][getMonth()-1];
  },
  nextMonthURL() {
    const nextMonth = new Date(getYear(), getMonth());
    return "/" + nextMonth.getFullYear() + "/" + (nextMonth.getMonth() + 1);
  },
  prevMonthURL() {
    const prevMonth = new Date(getYear(), getMonth()-2);
    return "/" + prevMonth.getFullYear() + "/" + (prevMonth.getMonth() + 1);
  },
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
    const marks = findInMonth().fetch();

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
});