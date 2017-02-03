import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';

import { Checkmarks } from './checkmarks.js';

export const findInMonth = function(roomie = undefined) {
  const year = getYear();
  const month = getMonth();
  const start = new Date(year, month-1);
  const end = new Date(year, month);
  if (typeof(roomie) === 'undefined') {
  	return Checkmarks.find(
      { createdAt: { $gte: start, $lt: end } },
      { sort: { createdAt: -1 } }
    );
  } else {
  	return Checkmarks.find(
  	  { checker: roomie,
  	  	createdAt: { $gte: start, $lt: end } },
  	  { sort: { createdAt: -1 } }
  	);
  }
}

export const getMonth = function() {
  if (ActiveRoute.name('Month.show')) {
    return FlowRouter.getParam('_month');
  } else {
    return (new Date()).getMonth() + 1;
  }
};

export const getYear = function() {
  if (ActiveRoute.name('Month.show')) {
    return FlowRouter.getParam('_year');
  } else {
    return (new Date()).getFullYear();
  }
};