const fs = require("fs");

const decapitalize = (str) =>
  str
    .split("")
    .map((e, i) => (i === 0 ? e.toLowerCase() : e))
    .join("");

const uniqBy = (arr, get) => {
  const set = new Set();

  return arr.filter((elem) => {
    const val = get(elem);
    if (set.has(val)) {
      if (val === "sai") return true;
      console.log("removing", val);
      return false;
    }
    set.add(val);
    return true;
  });
};

const reverse = (arr) => [...arr].reverse();

const deck = require("./deck.json");

deck.notes = deck.notes.map((note) => {
  note.fields = note.fields.map(decapitalize);
  return note;
});

deck.notes = uniqBy(reverse(deck.notes), (note) => note.fields[0]);

fs.writeFileSync("./new_deck.json", JSON.stringify(deck));
