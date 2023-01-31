/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  //should return an empty object if there are no dinosaurs
  if (dinosaurs.length === 0 ) {
    return {};
  }
  //set up variables to hold the values im looking for 
  let dino = dinosaurs[0].lengthInMeters * 3.281;

  let saur1 = dinosaurs[0].name;

  // console.log(saur1);
  //created a loop that sorts through the dinosaur object array and replaces my variables above with the longest dinosuar's name and length
  for (let i = 1; i < dinosaurs.length; i++) {
    let dinosaur = dinosaurs[i].lengthInMeters * 3.281;
    let saur = dinosaurs[i].name
    if (dinosaur > dino) {
      dino = dinosaur, saur1 = saur;
    } else continue;
  }
  // created an object to hold my new property
  const longDino = { [saur1] : dino};
 
  // returned that object
  return longDino;
  
} 

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  //creating my first if statement to return an error message if incorrect-id is entered
  if (id === "incorrect-id") {
    return "A dinosaur with an ID of 'incorrect-id' cannot be found.";
  }
  //created a variable to hold the string value i want to return
let din = `${dinosaurs[0].name + (dinosaurs[0].pronunciation) + dinosaurs[0].info}`;
// created for loop to search through the objects and get the values that i want
for (let i = 0; i < dinosaurs.length; i++) {
  //ternary to search through millions of years array and return different values based on length
let mya2 = dinosaurs[i].mya.length;
let mya = mya2 >= 2 ? dinosaurs[i].mya[1]: dinosaurs[i].mya[0];
let time = mya2 >= 2 ? `Early` : `Late`;
// if statement that prints out a string if id is matched
if (id === dinosaurs[i].dinosaurId) {
    din = `${`${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info}`} It lived in the ${time} Cretaceous period, over ${mya} million years ago.`;
  }

}

     return din;

}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {

let dino_Array =[];
for (let i = 0; i < dinosaurs.length; i++){
if ("Late Jurrassic" === dinosaurs[i].period) {
  dino_Array.push(dinosaurs[i].dinosaurId)
}
}
return dino_Array;

}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
