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
  let objValues = [];
  if (dinosaurs.length === 0) {
  console.log("No dinosaur data provided => {}");
  return {};
  } else {
    const lengthOfLongest = Math.max(...dinosaurs.map(o => o.lengthInMeters)); // => finds the highest lengthInMeters value in the dinosaurs object. Once found, we can loop through the object to capture the dinosaurs data.
    for (let i = 0; i < dinosaurs.length; i++) {
      if (dinosaurs[i].lengthInMeters === lengthOfLongest) {
        let longestDinoObj = dinosaurs[i];
        objValues = (Object.values(longestDinoObj));
        break;  // => once I match up lengthInMeters value with the dinosaur, I extract the object values into an array and then break from the loop.
      }
    }
    console.log(objValues); 
    let matchedDinoLength = {
      [objValues[1]] : (objValues[5] * 3.281),
    }; // => Added the name and lengthInMeters(converted to feet) values to a new object   
    return matchedDinoLength; // => { Brachiosaurus: 98.43 }
  }  
/*
- should return an object where the key is the tallest dinosaur name and the value is the length in feet
- should return the first dinosaur if there are multiples with the same length
- should return an empty object if there are no dinosaurs
*/  
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
    if (dinosaurs[i].dinosaurId == id) {
      console.log(dinosaurs[i].dinosaurId)
      console.log("ID match found");
      return (dinosaurs[i].name + " (" + dinosaurs[i].pronunciation + ")\n" + dinosaurs[i].info + " It lived in the " + dinosaurs[i].period + " period, over " + dinosaurs[i].mya.slice(-1) + " million years ago.");
    } 
  }
  // => if no match is found the following statement is returned.
  return "A dinosaur with an ID of '" + id + "' cannot be found."; 
/*
- should return a string description of a dinosaur, by ID
- should work for dinosaurs with only one value in `mya`
- should return an error message if the dinosaur cannot be found
- should not mutate the original dinosaurs array
*/
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
  let arrayOfDinosaurs = [];
    for (let i = 0; i < dinosaurs.length; i++) {
      if (key === "name") {
        if (dinosaurs[i].mya.length == 1) {
          console.log("dinosaur has only one 'mya' index")
          if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single index key value minus 1, if matched, then the dinosaurId is pushed to arrayOfDinosaurs.
          arrayOfDinosaurs.push(dinosaurs[i].name);
          console.log(arrayOfDinosaurs); 
          }
          continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
        } else if (dinosaurs[i].mya.length == 2) {
          if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
          // => if the array length is equal to two, it will check to see if the mya parameter value is less than or equal to mya[0] AND greater than mya[1]. If they match, then the dinosaurId is pushed to arrayOfDinosaurs.
          console.log("dinosaur has two 'mya' indexes");
          arrayOfDinosaurs.push(dinosaurs[i].name);  
          console.log(arrayOfDinosaurs);     
          continue; // after checking the double-index key, this sends it back to the loop to check the next dinosaur.
          }
        continue;
        } 
      }
      if (key === "pronunciation") {
        if (dinosaurs[i].mya.length == 1) {
          console.log("dinosaur has only one 'mya' index")
          if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single index key value minus 1, if matched, then the "pronunciation" is pushed to arrayOfDinosaurs.
          arrayOfDinosaurs.push(dinosaurs[i].pronunciation);
          console.log(arrayOfDinosaurs); 
          }
          continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
        } else if (dinosaurs[i].mya.length == 2) {
          if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
          // => if the array length is equal to two, it will check to see if the mya parameter value is less than or equal to mya[0] AND greater than mya[1]. If they match, then the "pronunciation" is pushed to arrayOfDinosaurs.
          console.log("dinosaur has two 'mya' indexes");
          arrayOfDinosaurs.push(dinosaurs[i].pronunciation);  
          console.log(arrayOfDinosaurs);     
          continue; // after checking the double-index key, this sends it back to the loop to check the next dinosaur.
          }
        continue;
        } 
      }
      if (key === "meaningOfName") {
        if (dinosaurs[i].mya.length == 1) {
          console.log("dinosaur has only one 'mya' index")
          if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single index key value minus 1, if matched, then the "meaningOfName" is pushed to arrayOfDinosaurs.
          arrayOfDinosaurs.push(dinosaurs[i].meaningOfName);
          console.log(arrayOfDinosaurs); 
          }
          continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
        } else if (dinosaurs[i].mya.length == 2) {
          if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
          // => if the array length is equal to two, it will check to see if the mya parameter value is less than or equal to mya[0] AND greater than mya[1]. If they match, then the "meaningOfName" is pushed to arrayOfDinosaurs.
          console.log("dinosaur has two 'mya' indexes");
          arrayOfDinosaurs.push(dinosaurs[i].meaningOfName);  
          console.log(arrayOfDinosaurs);     
          continue; // after checking the double-index key, this sends it back to the loop to check the next dinosaur.
          }
        continue;
        } 
      }
      if (key === "diet") {
        if (dinosaurs[i].mya.length == 1) {
          console.log("dinosaur has only one 'mya' index")
          if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single index key value minus 1, if matched, then value for "diet" is pushed to arrayOfDinosaurs.
          arrayOfDinosaurs.push(dinosaurs[i].diet);
          console.log(arrayOfDinosaurs); 
          }
          continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
        } else if (dinosaurs[i].mya.length == 2) {
          if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
          // => if the array length is equal to two, it will check to see if the mya parameter value is less than or equal to mya[0] AND greater than mya[1]. If they match, then the value for "diet" is pushed to arrayOfDinosaurs.
          console.log("dinosaur has two 'mya' indexes");
          arrayOfDinosaurs.push(dinosaurs[i].diet);  
          console.log(arrayOfDinosaurs);     
          continue; // after checking the double-index key, this sends it back to the loop to check the next dinosaur.
          }
        continue;
        } 
      }
      if (key === "lengthInMeters") {
        if (dinosaurs[i].mya.length == 1) {
          console.log("dinosaur has only one 'mya' index")
          if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single index key value minus 1, if matched, then value for "lengthInMeters" is pushed to arrayOfDinosaurs.
          arrayOfDinosaurs.push(dinosaurs[i].lengthInMeters);
          console.log(arrayOfDinosaurs); 
          }
          continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
        } else if (dinosaurs[i].mya.length == 2) {
          if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
          // => if the array length is equal to two, it will check to see if the mya parameter value is less than or equal to mya[0] AND greater than mya[1]. If they match, then the value for "lengthInMeters" is pushed to arrayOfDinosaurs.
          console.log("dinosaur has two 'mya' indexes");
          arrayOfDinosaurs.push(dinosaurs[i].lengthInMeters);  
          console.log(arrayOfDinosaurs);     
          continue; // after checking the double-index key, this sends it back to the loop to check the next dinosaur.
          }
        continue;
        } 
      }
      if (key === "period") {
        if (dinosaurs[i].mya.length == 1) {
          console.log("dinosaur has only one 'mya' index")
          if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single index key value minus 1, if matched, then value for "period" is pushed to arrayOfDinosaurs.
          arrayOfDinosaurs.push(dinosaurs[i].period);
          console.log(arrayOfDinosaurs); 
          }
          continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
        } else if (dinosaurs[i].mya.length == 2) {
          if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
          // => if the array length is equal to two, it will check to see if the mya parameter value is less than or equal to mya[0] AND greater than mya[1]. If they match, then the value for "period" is pushed to arrayOfDinosaurs.
          console.log("dinosaur has two 'mya' indexes");
          arrayOfDinosaurs.push(dinosaurs[i].period);  
          console.log(arrayOfDinosaurs);     
          continue; // after checking the double-index key, this sends it back to the loop to check the next dinosaur.
          }
        continue;
        } 
      }
      if (key === "info") {
        if (dinosaurs[i].mya.length == 1) {
          console.log("dinosaur has only one 'mya' index")
          if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single index key value minus 1, if matched, then value for "info" is pushed to arrayOfDinosaurs.
          arrayOfDinosaurs.push(dinosaurs[i].info);
          console.log(arrayOfDinosaurs); 
          }
          continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
        } else if (dinosaurs[i].mya.length == 2) {
          if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
          // => if the array length is equal to two, it will check to see if the mya parameter value is less than or equal to mya[0] AND greater than mya[1]. If they match, then the value for "info" is pushed to arrayOfDinosaurs.
          console.log("dinosaur has two 'mya' indexes");
          arrayOfDinosaurs.push(dinosaurs[i].info);  
          console.log(arrayOfDinosaurs);     
          continue; // after checking the double-index key, this sends it back to the loop to check the next dinosaur.
          }
        continue;
        } 
      } 
      else {
        if (dinosaurs[i].mya.length == 1) {
          console.log("dinosaur has only one 'mya' index")
          if (mya <= dinosaurs[i].mya[0] && (mya) >= ((dinosaurs[i].mya[0])-1)) { // => if the mya parameter is less than or equal to the single-index key value AND greater than or equal the same single index key value minus 1, if matched, then the dinosaurId is pushed to arrayOfDinosaurs.
          arrayOfDinosaurs.push(dinosaurs[i].dinosaurId);
          console.log(arrayOfDinosaurs); 
          }
          continue; // after checking the single-index key, this sends it back to the loop to check the next dinosaur.
        } else if (dinosaurs[i].mya.length == 2) {
          if (mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) {
          // => if the array length is equal to two, it will check to see if the mya parameter value is less than or equal to mya[0] AND greater than mya[1]. If they match, then the dinosaurId is pushed to arrayOfDinosaurs.
          console.log("dinosaur has two 'mya' indexes");
          arrayOfDinosaurs.push(dinosaurs[i].dinosaurId);  
          console.log(arrayOfDinosaurs);     
          continue; // after checking the double-index key, this sends it back to the loop to check the next dinosaur.
          }
        continue;
        } 
      }    
    }
    console.log(arrayOfDinosaurs);
    return arrayOfDinosaurs;
}
/*
******** tests that need to pass: ********
- should return the IDs of all dinosaurs that were alive  approximately at the given time (1 ms)
- should include dinosaurs with only one `mya` year (1 ms)
- if the `mya` key is an array of one number, should allow for 1 MYA less than the amount
- should return an empty array if the year does not match any
- if the third argument is set, should replace the IDs with the value of the given key
- if the third argument is set, but to a key that doesn't return a value, should return the IDs (1 ms)
*/


module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
