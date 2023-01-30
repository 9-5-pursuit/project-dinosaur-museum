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
const getLongestDinosaur = (dinosaurs) => {
  if (!dinosaurs.length === 0) return {};
  // Initialize the longestDino variable with the first dinosaur in the input array
  let longestDino = dinosaurs[0];

  // Iterate through the rest of the dinosaurs
  for (let i = 1; i < dinosaurs.length; i++) {
    // Compare the length of the current dinosaur with the current longest dinosaur
    if (dinosaurs[i].lengthInMeters >= longestDino.lengthInMeters) {
      // Update the longestDino variable to the current dinosaur if it's greater or equal
      longestDino = dinosaurs[i];
    }
  }

  // Convert the length of the dinosaur to feet
  const dinoLengthFeet = longestDino.lengthInMeters * 3.281;

  // Create an object dinoObj with the name of the longest dinosaur as the key and the length as the value
  const dinoObj = { [longestDino.name]: dinoLengthFeet };

  // Return the dinoObj
  return dinoObj;
};

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
const getDinosaurDescription = (dinosaurs, id) => {
  // destructure the dino object to extract the properties that we need
  const { name, pronunciation, info, period, mya } =
    dinosaurs.find((d) => d.dinosaurId === id) || {};
  // check if the dinosaur is found
  if (!name) {
    return `A dinosaur with an ID of '${id}' cannot be found.`;
  } else {
    // use template literals to make the code more readable
    return `${name} (${pronunciation})\n${info} It lived in the ${period} period, over ${
      mya[mya.length - 1]
    } million years ago.`;
  }
};

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
const getDinosaursAliveMya = (dinosaurs, mya, key) => {
  // Use filter method with a simple condition to check if the mya is included in the mya array of the dino or if the mya is between the start and end of the range of the mya array
  let dinosFound = dinosaurs.filter((dino) => {
    if (Array.isArray(dino.mya)) {
      return (
        dino.mya.includes(mya) || (dino.mya[0] <= mya && dino.mya[1] >= mya)
      );
    }
    return dino.mya === mya;
  });
  // Use map method to return the desired property
  return dinosFound.map((dinoObject) => {
    if (!key) return dinoObject.dinosaurId;
    return dinoObject[key] || dinoObject.dinosaurId;
  });
};

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
