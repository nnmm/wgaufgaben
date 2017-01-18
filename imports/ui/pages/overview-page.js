import { Template } from 'meteor/templating';
 
import { Checkmarks } from '../../api/checkmarks.js';

import './overview-page.html';
import '../components/taskinput.js';

Template.Overview_page.helpers({
  tasks() {
    return Checkmarks.find({}, { sort: { createdAt: -1 } });
  }
});