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
  // first I check the length of the "dinosaurs" array of dinosaur objects. If the length is 0, it is empty and I return an empty array.
  if (dinosaurs.length === 0) {
  return {};
  } else {
    const lengthOfLongest = Math.max(...dinosaurs.map(o => o.lengthInMeters)); // => finds the largest "lengthInMeters" value using Math.max from the "dinosaurs" array of objects. I assign the largest "lengthInMeters" value to a new variable "lenthOfLongest". Below, I loop through the dinosaurs array of objects to match the "lengthOfLongest" to the first index that where it matches "lengthInMeters".
    let objValues = [];
    for (let i = 0; i < dinosaurs.length; i++) {
      if (dinosaurs[i].lengthInMeters === lengthOfLongest) {
        let longestDinoObj = dinosaurs[i];
        objValues = (Object.values(longestDinoObj));
        break;  // => once I match up lengthInMeters value with the dinosaur, I extract all of the object values from that index and assign them to a new array "ObjValues" and then break from the loop.
      }
    }
    let matchedDinoLength = {
      [objValues[1]] : (objValues[5] * 3.281),
    }; // => I created a new object using two of the indexes from "objValues". Meters were converted to feet in the process.
    return matchedDinoLength; // => { Brachiosaurus: 98.43 }
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
  for (let i = 0; i < dinosaurs.length; i++) {
// looping through the dinosaurs array of dinosaur objects to see if the key "dinosaurid" matches the unique identifier parameter "id". If a match is found it will then return a lengthy string that pulls in multiple key values formatted to spec.
    if (dinosaurs[i].dinosaurId == id) {
      return (dinosaurs[i].name + " (" + dinosaurs[i].pronunciation + ")\n" + dinosaurs[i].info + " It lived in the " + dinosaurs[i].period + " period, over " + dinosaurs[i].mya.slice(-1) + " million years ago.");
    } 
  }
  // => if no match is found the following string is returned with the parameter "id" embedded .
  return "A dinosaur with an ID of '" + id + "' cannot be found."; 
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
  let arrayOfDinosaurs = []; // declared new array to be used below.
  for (let i = 0; i < dinosaurs.length; i++) {
    if (key === "name") {
      // since there are tests that include key names that should be returned instead of the the dinosaurId, I have duplicated the process for each of the keys in the array of dinosaur objects. Since the "name" is the only valid one in the tests besides dinosaurId, I have collapsed the other keys to keep it manageable. At the time I was doing this first part of the project, I was having a problem getting the code to loop through the nested array of objects using the key as a variable (even with bracket notation), that is why I had to go the long route with this one below. My apologies.
      if (dinosaurs[i].mya.length == 1) {
        if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => This  captures the "name" key values for dinosaurs alive during for the parameter "mya" year provided. If the dinosaurs array of objects "mya" key has an array length equal to "1", the if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the "mya" parameter is less than or equal to the single-index key value AND greater than or equal the same single-index key value (minus 1), if both are true, then the value of the "name" key is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].name);
        }
        continue; // => after checking the single-index key, this sends it back to the loop to check the next dinosaur.
      } else if (dinosaurs[i].mya.length == 2) {
          if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {           
        // => If the dinosaurs array of objects "mya" key has an array length equal to "2", the if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the "mya" parameter value is less than or equal to mya[0] AND greater than or equeal to mya[1] of the current index. If both are true, then the value of the "name" key is pushed to arrayOfDinosaurs.          
          arrayOfDinosaurs.push(dinosaurs[i].name);  
          continue; // => after checking the double-index key, this sends it back to the loop to check the next dinosaur.
          }
      continue;
      } 
    }
    if (key === "pronunciation") {
      if (dinosaurs[i].mya.length == 1) {
        if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the array length is equal to "1", my if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single-index key value (minus 1), if both are true, then the value of "pronunciation" key value is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].pronunciation);
        }
        continue; // => after checking the single-index key, this sends it back to the loop to check the next dinosaur.
      } else if (dinosaurs[i].mya.length == 2) {
        if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
        // => if the array length is equal to "2", my if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the mya parameter value is less than or equal to mya[0] AND greater than or equeal to mya[1] of the current index. If both are true, then the "pronunciation" key value is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].pronunciation);  
        continue; // => after checking the double-index key, this sends it back to the loop to check the next dinosaur.
        }
      continue;
      } 
    }
    if (key === "meaningOfName") {
      if (dinosaurs[i].mya.length == 1) {
        if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the array length is equal to "1", my if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single-index key value (minus 1), if both are true, then the value of "meaningOfName" key value is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].meaningOfName);
        }
        continue; // => after checking the single-index key, this sends it back to the loop to check the next dinosaur.
      } else if (dinosaurs[i].mya.length == 2) {
        if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
        // => if the array length is equal to "2", my if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the mya parameter value is less than or equal to mya[0] AND greater than or equeal to mya[1] of the current index. If both are true, then the "meaningOfName" key value is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].meaningOfName);  
        continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
        }
      continue;
      } 
    }
    if (key === "diet") {
      if (dinosaurs[i].mya.length == 1) {
        if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the array length is equal to "1", my if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single-index key value (minus 1), if both are true, then the value of "diet" key value is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].diet);
        }
        continue; // => after checking the single-index key, this sends it back to the loop to check the next dinosaur.
      } else if (dinosaurs[i].mya.length == 2) {
        if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
        // => if the array length is equal to "2", my if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the mya parameter value is less than or equal to mya[0] AND greater than or equeal to mya[1] of the current index. If both are true, then the "diet" key value is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].diet);  
        continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
        }
      continue;
      } 
    }
    if (key === "lengthInMeters") {
      if (dinosaurs[i].mya.length == 1) {
        if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the array length is equal to "1", my if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single-index key value (minus 1), if both are true, then the value of "lengthInMeters" key value is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].lengthInMeters);
        }
        continue; // => after checking the single-index key, this sends it back to the loop to check the next dinosaur.
      } else if (dinosaurs[i].mya.length == 2) {
        if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
        // => if the array length is equal to "2", my if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the mya parameter value is less than or equal to mya[0] AND greater than or equeal to mya[1] of the current index. If both are true, then the "lengthInMeters" key value is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].lengthInMeters);  
        continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
        }
      continue;
      } 
    }
    if (key === "period") {
      if (dinosaurs[i].mya.length == 1) {
        if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the array length is equal to "1", my if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single-index key value (minus 1), if both are true, then the value of "period" key value is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].period);
        }
        continue; // => after checking the single-index key, this sends it back to the loop to check the next dinosaur.
      } else if (dinosaurs[i].mya.length == 2) {
        if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
        // => if the array length is equal to "2", my if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the mya parameter value is less than or equal to mya[0] AND greater than or equeal to mya[1] of the current index. If both are true, then the "period" key value is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].period);  
        continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
        }
      continue;
      } 
    }
    if (key === "info") {
      if (dinosaurs[i].mya.length == 1) {
        if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the array length is equal to "1", my if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single-index key value (minus 1), if both are true, then the value of "info" key value is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].info);
        }
        continue; // => after checking the single-index key, this sends it back to the loop to check the next dinosaur.
      } else if (dinosaurs[i].mya.length == 2) {
        if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
        // => if the array length is equal to "2", my if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the mya parameter value is less than or equal to mya[0] AND greater than or equeal to mya[1] of the current index. If both are true, then the "info" key value is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].info);  
        continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
        }
      continue;
      } 
    } 
    else { // => DEFAULT ELSE/IF STATEMENTS
      if (dinosaurs[i].mya.length == 1) {
        if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { 
          // => THIS IS THE DEFAULT which captures the "dinosauriD" key values for dinosaurs alive during the parameter "mya" year provided. It also defaults to this when the parameter key value does not match any of the keys from the array of dinosaurs objects. If the dinosaurs array of objects "mya" key has an array length equal to "1", the if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the "mya" parameter is less than or equal to the single-index key value AND greater than or equal the same single-index key value (minus 1), if both are true, then the value of the "dinosaurId" key is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].dinosaurId);
        }
        continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
      } else if (dinosaurs[i].mya.length == 2) {
        if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
        // => If the dinosaurs array of objects "mya" key has an array length equal to "2", the if statement loops through the "dinosaurs" array of dinosaur objects and checks to see if the "mya" parameter value is less than or equal to mya[0] AND greater than or equeal to mya[1] of the current index. If both are true, then the value of the "dinosaurId" key is pushed to arrayOfDinosaurs.
        arrayOfDinosaurs.push(dinosaurs[i].dinosaurId);  
        continue; // after checking the double-index key, this sends it back to the loop to check the next dinosaur.
        }
      continue;
      } 
    }    
  }
  return arrayOfDinosaurs;
}


module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
