/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
let getDinosaurId = [];
// first I will have to loop through the array of dinosaurs object to locate the dinosaurId since the dinosaur names are not provided as values in the arry of room obects. If matched, I will push the dinosaurId into a new array (getDinosaurId).
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i]["name"] === dinosaurName) {
      getDinosaurId.push(dinosaurs[i]["dinosaurId"]); 
    } else {
      continue;
    }
  }    
// if no match is found the length of the getDinosaurId array will be 0. 
  if (getDinosaurId.length === 0) {
  return "Dinosaur with name '" + dinosaurName + "' cannot be found."
  }  
// Now that I have the dinosaurId, I will loop through the rooms array of objects to see if any of the "dinosaurs" keys includes the "dinosaurId" (getDinosaurId). If it does, I will return the name of the room of that index.
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i]["dinosaurs"].includes(getDinosaurId[0])) {
      console.log("rooms contains dinosaur");
      return rooms[i].name;
    } else {
      continue; 
    }
  }
  // if none of the indexes return a result, then the dinosaur cannot be found.
  return "Dinosaur with name '" + dinosaurName + "' cannot be found in any rooms."
}

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
function getConnectedRoomNamesById(rooms, id) {
  let connectsToArray = [];
  for (let i = 0; i < rooms.length; i++) {
    // using bracket notation, I'm looking for the provided "id" in my array of rooms object. If/when it's found, I'm pushing it to the new object connectsToArray. 
    if (rooms[i]["roomId"] === id) {
      connectsToArray.push(rooms[i]["connectsTo"]);
      connectsToArray = connectsToArray[0];
    }
  }
  // If no match is found the length of the connectsToArray will be 0.
  if (connectsToArray.length === 0) {
    return `Room with ID of '${id}' could not be found.`;
  }
  
  let roomNamesArray = [];
  // below, I'm running a nested loop that's looping through the rooms object searching for the "roomId" located in each of the indexes within the connectsToArray. I'm looping the connectsToArray starting at the end and moving forward. That is because I'm pushing the room "name" back to the first position of the roomNamesArray as it loops through.
  for (let i = 0; i < rooms.length; i++) {
    for (let index = connectsToArray.length-1; index >= 0; index--) {
      if (connectsToArray[index] === rooms[i]["roomId"]) {
        roomNamesArray.push(rooms[i]["name"]);
      }
    }
  }
  // to check for incorrect connected room ID's, I'm comparing the length of the input and output arrays. If they are not equal, then one of the id's was invalid. 
  if (roomNamesArray.length !== connectsToArray.length) {
    return "Room with ID of 'incorrect-id' could not be found."
  } else {
    return roomNamesArray;
  }
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
