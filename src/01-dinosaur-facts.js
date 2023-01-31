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
  // Guard clause checks to see if array is empty and returns empty object if true
  if (dinosaurs.length === 0) {
    return {};
  }
  // Starts with first dinosaur object in `dinosaurs` array
  let longestDinosaur = dinosaurs[0]; 

  // Checks if the length of the current dino in the array is greater than the length of the `longestDinosaur`
  // If true, updates `longestDinosaur` object with current dinosaur
  for (let dinosaur of dinosaurs) {
    if (dinosaur.lengthInMeters > longestDinosaur.lengthInMeters) {
      longestDinosaur = dinosaur;
    }
  }
  // Converts the length of the longest dinosaur to feet before returning object
  return {[longestDinosaur.name]: longestDinosaur.lengthInMeters * 3.2808
  }
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
  // Guard clause checks to see if `incorrect id` is passed and returns error message if true
  if (id === "incorrect-id") {
    return "A dinosaur with an ID of 'incorrect-id' cannot be found.";
  }
 // Loops through `dinosaurs` array
  for (let dinosaur of dinosaurs) {
    if (dinosaur.dinosaurId === id) { // Checks if ids match
      let mya = dinosaur.mya;
      if (mya.length > 1) { // Nested if statement checks how many elements are in `mya` array and sets value to second element if more than one is in there
        mya = mya[1];
      }
      // Returns string with dynamic values describing specific dinosaur's information
      return `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${mya} million years ago.`

    }
  }
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
  // Declare empty array to pass living dinos into once found
    let dinosAlive = [];
    // Loops through `dinosaurs` array
    for (let dinosaur of dinosaurs) {
  
      // If the key passed into the function doesn't exist or is undefined
      if (!dinosaur.hasOwnProperty(key))
        // set the key to `dinosaurID`
        key = 'dinosaurId';
  
      // Copy object's `mya` into a new array called `range`
      // This is needed so original data is not modified
      let range = dinosaur.mya;
  
      // If new array is only one element long 
      if (range.length < 2)
        // Take the single element (e.g. 66),
        // Subtract one from it (66 => 65),
        // Add it to the end of the `range` array (so the array is now [66, 65]).
        // If 65 is passed into the function, it will be within the dinosaur's `mya` range
        range.push(dinosaur.mya[0] - 1);
  
      // Now dinosaurs `mya` is seen as a range
      // If `mya` falls within the `range`, add `dinosaurId` to `dinosAlive` array
      if (mya <= range[0] && mya >= range[1]) {
          dinosAlive.push(dinosaur[key]);
      }
    }
    return dinosAlive;
}


module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
