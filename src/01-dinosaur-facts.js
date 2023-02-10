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
  if (dinosaurs.length < 1) {
    return {};
  }

  // loop to find longest dinosaur
  // meters to feet = ft * 3.281

  // for (dinosaurs.lengthInMeters of dinosaurs) {
  //   for (let)
  // }

  let longestDino = 0;
  let longestDinoName = "";

  for (let dino of dinosaurs) {
    if (dino.lengthInMeters > longestDino) {
      longestDino = dino.lengthInMeters;
      longestDinoName = dino.name;
    }
    
  }

  // console.log(longestDino);
  // console.log(longestDinoName);

  return { [longestDinoName]: longestDino * 3.281 };

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

// returns desc of dinosaur, if dino id invalid returns error msg
// use \n for new line in text
// default value should be error message?
// error message: `A dinosaur with an ID of 'incorrect-id' cannot be found.`
// function should loop thru dinosaur obj to find id and return desc, if desc cant be found return error msg

function getDinosaurDescription(dinosaurs, id) {

let result = `A dinosaur with an ID of 'incorrect-id' cannot be found.`;

for (let dino of dinosaurs) {
  if (dino.dinosaurId === id) {
    result = `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length - 1]} million years ago.`;
  }
}

return result;

}

// console.log(getDinosaurDescription(exampleDinosaurData, "GGvO1X9Zeh"));
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

// default value is array
// mya -> millions of yrs ago
// key param includes dinos that lived during mya, otherwise returns dino id
// should return the ids of all dinos that were alive approx at the given time
// should include dinos with only one mya year
// if mya key is an array of one #, should allow for 1 mya less than the amount
// should return empty array if year does not match any
// if 3rd arg is set should replace ids w the val of the given key
// loop through dino array and return array of dinos who were alive at the given mya val



function getDinosaursAliveMya(dinosaurs, mya, key) {

let result = [];

for (let dino of dinosaurs) {
  // console.log(dino); // logs entire dinosaurs array
  if (dino.mya.length === 1) { // if mya is single val
    // console.log(dino.mya);
    if (dino.mya[0] === mya || dino.mya[0] - 1 === mya) { // if dino only has one val for mya, mya val can be equal to given val or one less
      if (key && !!dino[key]) {
        result.push(dino[key]); // initial val is [];
      } else {
        result.push(dino.dinosaurId);
        // only adds id to result array
      }
    }
  }
  // console.log(result);
// if (mya <= dino.mya.length) <- this is wrong sorry
  if (mya <= dino.mya[0] && mya >= dino.mya[1]) { // for dino obj with mya val more than one
    if (key && !!dino[key]) {
      result.push(dino[key]);
    } else {
      result.push(dino.dinosaurId);
    }
  }
  // console.log(result);
}

return result;
}

// console.log(getDinosaursAliveMya(exampleDinosaurData));

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
