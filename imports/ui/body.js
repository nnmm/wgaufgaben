import { Template } from 'meteor/templating';
 
import { Checkmarks } from '../api/checkmarks.js';
 
import './taskinput.js';
import './body.html';
 
Template.body.helpers({
  tasks() {
    return Checkmarks.find({}, { sort: { createdAt: -1 } });
  },
  taskinputs: [
    { name: "Biomüll", weight: 1 },
    { name: "Restmüll", weight: 2 },
    { name: "WG-Wäsche", weight: 4 },
    { name: "Handtücher", weight: 1 },
    { name: "Spülmaschine", weight: 1 },
    { name: "Einkaufen", weight: 2 }
  ],
  roommates() {
    let roomies = [
      { name: "Felix" },
      { name: "Veronika" },
      { name: "Niko" },
      { name: "Stefan" },
    ];
    return roomies;
    return Checkmarks.aggregate([
        { $group: { name: "$checker", total: { $sum: 1 }} },
      ]);
    

  },
});


