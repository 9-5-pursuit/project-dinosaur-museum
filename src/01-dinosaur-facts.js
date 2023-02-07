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
  // if no dinosaur return empty object
  if (dinosaurs.length === 0) {
    return {};
  }
  // set dinosaur height is equal to zero
  let tallest = 0;  
  // set dinosaur name is empty string
  let tallestName = " ";
  // set empty onject for the dinosaur
  let object = {};
// loop through the dinosaur
  for (let i = 0; i < dinosaurs.length; i++) {
    // compare the dinosaur height with dinosaur array
    if (dinosaurs[i].lengthInMeters > tallest) {
      // set the tallest dinosaur to the variable tallest
    tallest = dinosaurs[i].lengthInMeters;
    // set the tallest dinosaur name
    tallestName = dinosaurs[i].name;
  }
}
// return the tallest dinosaur name key with tallest height value
object[tallestName] = tallest * 3.281;
return object;

//console.log(tallest);
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
  // set the variable description for incorrect dinosaur id
  let description = `A dinosaur with an ID of 'incorrect-id' cannot be found.`;
  // loop through the dinosaur
  for (let dino of dinosaurs) {
    // if the dinosaur id equals
    if (dino.dinosaurId === id) {
      description = `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length - 1]} million years ago.`;
    }
  } // if id doesnot match return the error message
  return description;
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
  // set an empty array for the alive dinosaurs
  let alive = [];
  // loop through the dinosaur
  for (let i = 0; i < dinosaurs.length; i++) {
    let element = dinosaurs[i];
    if (element.mya.length === 1) {
      // If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less
      if (element.mya[0] === mya || element.mya[0] - 1 === mya) {
        // return the key if alive
        if (element.hasOwnProperty(key)) {
          alive.push(element[key]);
        } else {
          // return id if not alive
          alive.push(element.dinosaurId);
        }
      }
    } else { // mya is less than first value and greater than the second value
      if (element.mya[1] <= mya && mya <= element.mya[0]) {
        if (element.hasOwnProperty(key)) {
          // return the key if alive
          alive.push(element[key]);
        } else {
          // return id if not alive
          alive.push(element.dinosaurId);
        }
      }
    }
  }
  return alive;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
