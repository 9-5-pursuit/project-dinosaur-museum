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

/*---------- LARGEST SIZE IN ARRAY OF OBJ --------------
- 1. created an empty object for longest dino
- 2. if statement - guard clause to execute before anything in case dinosaurs object is empty.
- 3. else statement to execute to get longest dino
- 4. key var with empty string to assign dino.name later
- 5. val var with 0 to start comparing the lengthInMeters
- 6. for loop;
  - index starting at 0 in dinos array;
  - as long as index is less than dinos array;
  - index will increase;
- 7. created if statement within the for loop;
  - dino.lIM at i is greater than val var 
    - reassign key to dino name and val to dino lIM
- 8. after loops thru and no longer less than dinos.length assign temp lit. key var to longestDino({}) while converting val var into feet
- 9. return longestDino obj
*/ 
function getLongestDinosaur(dinosaurs) {
  let longestDino = {};

  if (dinosaurs.length === 0){

    return longestDino;

  } else if (dinosaurs.length > 0){

    let key = "";
    let val = 0;

    for (let i = 0; i < dinosaurs.length; i++){

      if (dinosaurs[i].lengthInMeters > val){

        key = dinosaurs[i].name;
        val = dinosaurs[i].lengthInMeters;

      }
    }
    longestDino[`${key}`] = val * 3.281
    return longestDino;
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
/* ------------ GET DINO DESCRIPTION ---------------
- 1. assigned var for dino description which will be reassigned when a condition is true
  - initial value of dinoDesc will be error if id cannot be found
- 2. started a for loop to loop thru dinosaurs obj
  - started index at 0
  - as long as the index is less than dinosaur obj length
  - increase index
- 3. created if / else if statement;
  - if dinosaurs at index [i]'s dinosaur id matches the id paramater AND the mya length equals 1 (only one in mya array)
    - reassigned dinoDesc using temp lit. with name and pronun. on one line, began a new line with info, string, preiod and mya at index 0 . (to add new line without indents had to delete all pre tabbed space before the new line)
    - returned the newly assigned desc
  - else if dinosaurs at index [i]'s dinosaur id matches the id paramater AND the mya length greater than 1 (mya array < 1)
    - reassign  dinoDesc to include the same as the loop before but mya at index 1
    return newly assigned dino
- 4. returns initial dino desc if no conditions true;

*/ 
function getDinosaurDescription(dinosaurs, id) {
    let dinoDesc = `A dinosaur with an ID of '${id}' cannot be found.`;
  
    for (let i = 0; i < dinosaurs.length; i++){

        if (dinosaurs[i].dinosaurId === id && dinosaurs[i].mya.length === 1){

          dinoDesc = `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})
${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[0]} million years ago.`
  
          return dinoDesc;  

      } else if (dinosaurs[i].dinosaurId === id && dinosaurs[i].mya.length > 1){
        dinoDesc = `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})
${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${dinosaurs[i].mya[1]} million years ago.`;
        return dinoDesc;
        }
    }

    return dinoDesc;
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
/* -------- ARRAY OF ALL DINOS LIVING DURING MYA -----------
- 1. assigned var for array where will put info based on mya and key
- 2. started for loop 
    - index starting at 0; as long as index is less than dinosaurs array; increment index
- 3. if statement 
    - if dinosaurs at index i mya array length is equal to 2 
    - created another if statement
      - if dinos mya at index 0 is greater than mya AND if mya is greater than dinos mya at index 1
      - (if dinos was alive between given mya period)
      - created var for dinokeys which equaled keys in dinos index i
- 4. nested if dinoskeys does not include key given in parameters
    - then psuh dino id into dinoLived array var
- 5. else push key  given in parameters into dino lived array var
- 6. else if dinos at index have 1 in mya length then if statement
    - dinos mya at index 0 is equal to mya OR mya is equal to index 0 minus one then dinokeys equals dinso keys (if it is equal to mya or mya - 1)
    - nested if if dinos keys doesnt include key given in parameter then push dino id
    - else push dino key that was given in parameters
- 7. return new dinoLived array
*/
function getDinosaursAliveMya(dinosaurs, mya, key) {

  let dinoLived = [];

  for (let i = 0; i < dinosaurs.length; i++) {
    
    if (dinosaurs[i].mya.length === 2) {

      if (dinosaurs[i].mya[0] >= mya && mya >= dinosaurs[i].mya[1]) {
        const dinoKeys = Object.keys(dinosaurs[i])
        if (!dinoKeys.includes(key)) {

          dinoLived.push(dinosaurs[i].dinosaurId);

        } else {

          dinoLived.push(dinosaurs[i][key]);

        }
      }

    } else if (dinosaurs[i].mya.length === 1) {

      if (dinosaurs[i].mya[0] === mya || mya === dinosaurs[i].mya[0]-1) {
        const dinoKeys = Object.keys(dinosaurs[i]);
      
        if (!dinoKeys.includes(key)) {
          
          dinoLived.push(dinosaurs[i].dinosaurId);

        } else {

          dinoLived.push(dinosaurs[i][key]);

        }
      }
    }
  }
  return dinoLived;

}


module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
