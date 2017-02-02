export const task_list = [
  { name: "Persönlicher Putzdienst", type: "standard", weight: 0 },
  { name: "Biomüll", type: "standard", weight: 1 },
  { name: "Restmüll", type: "standard", weight: 2 },
  { name: "WG-Wäsche waschen", type: "standard", weight: 4 },
  { name: "Handtücher wechseln", type: "standard", weight: 1 },
  { name: "Spülmaschine ausräumen", type: "standard", weight: 1 },
  { name: "Einkaufen", type: "standard", weight: 2 },
  { name: "Flur saugen", type: "standard", weight: 2 },
  { name: "Briefe nachtragen", type: "standard", weight: 3 },
  { name: "Flurtisch aufräumen", type: "standard", weight: 1 },
  { name: "Pfandflaschen zurückgeben", type: "standard", weight: 4 },
  { name: "Wasserkocher entkalken", type: "standard", weight: 2 },
  { name: "Duschabfluss reinigen", type: "standard", weight: 3 },
  { name: "Wohnung lüften", type: "standard", weight: 1 },
];

export const taskIndex = function() {
  let ti = {};
  task_list.forEach(function(tsk, ix, arr) {
    ti[tsk.name] = ix;
  });
  return ti;
}();
