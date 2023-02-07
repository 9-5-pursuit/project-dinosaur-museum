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
  // set the dinosaur id is null
  let id = null;
  // set the dinosaur room is null
  let dinoRoom = null;
  // loop through the dinosaurs
  for(let i = 0; i < dinosaurs.length; i++) {
    // if the dinosaurName exists in the dinosaur array set it to the dinosaur id
    if (dinosaurName === dinosaurs[i].name) {
      id = dinosaurs[i].dinosaurId;
    }
  }// loop through the rooms array
  for (let j = 0; j < rooms.length; j++) {
    // check the dinosaur id includes in the rooms array set it to the dinosaur room
    if (rooms[j].dinosaurs.includes(id)) {
      dinoRoom = rooms[j].name;
    }
  }// not found dinosaur id
  if (!id) {
  return `Dinosaur with name '${dinosaurName}' cannot be found.`
  } else if (!dinoRoom) { // not found dinosaur room
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  } else { // dinosaur room
    return dinoRoom;
  }
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
  let result = [];
  let foundRoom = null;
// loop through the rooms array
  for (let i = 0; i < rooms.length; i++) {
    const element = rooms[i];
// check the id exists in the room if so set it to foundRoom variable
    if (element.roomId === id) {
      foundRoom = element;
    }
  }
// it does not find the id return the error message
  if (!foundRoom) {
    return `Room with ID of '${id}' could not be found.`;
  }

  let foundCount = 0;
  // if the room id exists it takes the connectsTo array length
  let targetRoomCount = foundRoom.connectsTo.length;
// loop through the rooms array
  for (let i = 0; i < rooms.length; i++) {
    const element = rooms[i];
    
    //["A6QaYdyKra"].indexOf(A6QaYdyKra) === -1
    // check the room id exists 
    if (foundRoom.connectsTo.indexOf(element.roomId) === -1) {
      continue;
    } else {
      result.push(element.name);
      foundCount++;
    }
  }
// does not exits return the error message
  if (foundCount !== targetRoomCount) {
    return `Room with ID of 'incorrect-id' could not be found.`;
  } else {
    return result;
  }
}


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
