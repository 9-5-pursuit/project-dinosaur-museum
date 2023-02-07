/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

// ---------------------- FIRST FUNCTION ---------------------- //

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
  let longestDino = {};
  let d = dinosaurs;

  //If there are no dinosaurs, return an empty object.
  if (d.length === 0) {
    return longestDino;
  }
  //Assign the first dinosaur length to the a variable.
  let longestDinoHeight = d[0].lengthInMeters;
  let longestDinoName;

  //Loop through the array of dinosaurs, and if the dinosaur height is greater than the initial length store the height and name of the dinosaur.
  for (let i = 0; i < d.length; i++) {
    if (d[i].lengthInMeters > longestDinoHeight) {
      longestDinoHeight = d[i].lengthInMeters;
      longestDinoName = d[i].name;
    }
  }
  // Convert the height from meters to feet and store it in the longestDino as a value to the name as a key and return it.
  longestDino[longestDinoName] = longestDinoHeight * 3.281;
  return longestDino;
}

// ---------------------- SECOND FUNCTION ---------------------- //

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

// ---------------------- THIRD FUNCTION ---------------------- //

function getDinosaurDescription(dinosaurs, id) {
  // Shortning dinosaurs to d and declaring a variables with a message to display if certain conditions are not met.
  let d = dinosaurs;
  let description = `A dinosaur with an ID of '${id}' cannot be found.`;

  for (let i = 0; i < d.length; i++) {
    // If the dinosaur id is found, return the description below with its respective dynamic values. The description also takes mya's length in to account by taking the first element of mya.
    if (id === d[i].dinosaurId) {
      description = `${d[i].name} (${d[i].pronunciation})\n${
        d[i].info
      } It lived in the ${d[i].period} period, over ${
        d[i].mya[d[i].mya.length - 1]
      } million years ago.`;
    }
  }
  // Returning the description. If the if condition is not met, it will return an error message at the top.
  return description;
}

// ---------------------- FOURTH FUNCTION ---------------------- //
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
  let d = dinosaurs;
  let dinoAliveMya = [];
  let initialMya = 1;
  // The for loop will iterate through the dinosaurs array and check if the length of Mya. If there is only one mya value, and if the given mya is equal to the mya value or one less, and if key is found in the dinosaurs object, the key will be assigned to the new array, if not dinosaus id will be pushed.
  for (let i = 0; i < d.length; i++) {
    if (d[i].mya.length === initialMya) {
      if (d[i].mya[0] === mya || d[i].mya[0] - 1 === mya) {
        if (Object.keys(d[i]).includes(key)) {
          dinoAliveMya.push(d[i][key]);
        } else {
          dinoAliveMya.push(d[i].dinosaurId);
        }
      }
    }
    // If mya is different from the initialMya value, and if there is "key" in dinosaur the key will be inserted into the new array. If not, dinosaur id will be pushed to dinoAliveMya. Finally, dinoAliveMya will be returned.
    else if (d[i].mya[0] <= mya && mya <= d[i].mya[1]) {
      if (Object.keys(d[i]).includes(key)) {
        dinoAliveMya.push(d[i][key]);
      } else {
        dinoAliveMya.push(d[i].dinosaurId);
      }
    }
  }
  return dinoAliveMya;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
