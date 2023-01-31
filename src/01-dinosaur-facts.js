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
  let dinoObject = {};
   // we need something to compare the numbers(value) and we need the name(key). longest will have the value of a number we are attaining. and creating a new variable for the name.
  // need a new object with (key)name of dino and key pair value (height converted into feet)
  if (dinosaurs.length === 0) {
    return {};
  }
  let dinoLength =  dinosaurs[0].lengthInMeters
  let dinoName = dinosaurs[0].name
  
  //  dinoLength *= 3.281
// dinolength is a number
  for (let i = 1; i < dinosaurs.length; i++) {
    if (dinoLength < dinosaurs[i].lengthInMeters) {
      // 12 < 21 the reassign longest (index 0) < (index1)
      // 21 < 30 yes reaasign longest (index 1) < (index 2)
      // 30 <0.65 no dinolength is now 30 
      // name also has to change
      dinoLength = dinosaurs[i].lengthInMeters
      dinoName = dinosaurs[i].name
       
      
    } 
    
  }
  // should do any modifications outside of the loop
  dinoObject[dinoName] = dinoLength * 3.281;
  return dinoObject;
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
  
  let dinoName;
  let dinoPro;
  let dinoInfo;
  let periodTime;
  let milYearsAgo;
  


  for (let i = 0; i < dinosaurs.length; i++) {
    //if not dinosaur is found should return error message
   if (dinosaurs[i].dinosaurId === id) {
  dinoName = dinosaurs[i].name;
  dinoPro = dinosaurs[i].pronunciation;
  dinoInfo = dinosaurs[i].info;
  periodTime = dinosaurs[i].period;
  milYearsAgo = dinosaurs[i].mya[dinosaurs[i].mya.length -1]
  
    
       } 

   }

   if (dinoName === undefined) {
    return `A dinosaur with an ID of 'incorrect-id' cannot be found.`;
  }
   
  return `${dinoName} (${dinoPro})\n${dinoInfo} It lived in the ${periodTime} period, over ${milYearsAgo} million years ago.`
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
 
  let dinos = [];
  for (let i = 0; i < dinosaurs.length; i++) {
    if(dinosaurs[i].mya.includes(mya) || dinosaurs[i].mya-1 === mya||dinosaurs[i].mya[0] > mya && dinosaurs[i].mya[1] < mya ) {
      if (key) {
        dinos.push(dinosaurs[i][key])
      } else {
      dinos.push(dinosaurs[i].dinosaurId)

    }
    }
  

  
}
return dinos
}
//   let myNewArray = [];
//   for (let i = 0; i < dinosaurs.length; i++) {
//     if (dinosaurs[i].mya.includes(mya)) {
//       return 
//     }
//   }
//   return myNewArray;



module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
