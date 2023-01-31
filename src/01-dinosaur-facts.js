/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable 
  below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

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
/**
 * I set up a way to store a new object and 2 variables to store the name and length in meters so I could do the math after the longest dinosaur was found.Once the loop runs we can set up the key: value pair to return back in our object.
 */
function getLongestDinosaur(dinosaurs) { 
  const longestDinoObj = {};
  let longestDinoName;
  let lengthOfLongest = 0;
  const meterToFeet = 3.281;
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].lengthInMeters > lengthOfLongest) {
      longestDinoName = dinosaurs[i].name;
      lengthOfLongest = dinosaurs[i].lengthInMeters;
    }
  }
  if (lengthOfLongest > 0) {
    longestDinoObj[longestDinoName] = (lengthOfLongest * meterToFeet);
  }
  return longestDinoObj;
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
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of 
 * projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
/**
 * I set up a variable called preciseMya for when only one number is given instead of 2 and gave it the value of one to count the length of the mya array coming in. Then I set up the for loop so I could call on the inde numbers of the objects as we chick if the ids match and if the dinosaur lived during the time given. If the dinoesaur is not found or didn't live during a certain time, then an error message is return instead.
 */
function getDinosaurDescription(dinosaurs, id) { 
  const preciseMya = 1;
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].dinosaurId === id && dinosaurs[i].mya.length === preciseMya) {
      return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[0]} million years ago.`;
    } 
    else if (dinosaurs[i].dinosaurId === id) {
      return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[1]} million years ago.`;
    }
  }
    return `A dinosaur with an ID of '${id}' cannot be found.`;
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a 
 * `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one 
 * less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
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
/**
 * In this function I had to use Object.keys to scan through each key in each object to see if the given key was in the object and then push the found key onto the myaArray I made to return back thr result.ßß
 */
function getDinosaursAliveMya(dinosaurs, mya, key) { 
  let myaArray = [];
  const preciseMya = 1;
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].mya.length === preciseMya) {
      const oneLessThanPreciseMya = dinosaurs[i].mya[0] - 1;
      if (dinosaurs[i].mya[0] === mya || oneLessThanPreciseMya === mya) {
        if (Object.keys(dinosaurs[i]).includes(key)) {
          myaArray.push(dinosaurs[i][key]);
        } else {
          myaArray.push(dinosaurs[i].dinosaurId);
        }
      }
    }
    else if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
      if (Object.keys(dinosaurs[i]).includes(key)) {
        myaArray.push(dinosaurs[i][key]);
      } else {
        myaArray.push(dinosaurs[i].dinosaurId);
      }
    }
  }
  return myaArray;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
