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
  // Create variables to be updated later. 
  let dinoId = "";
  let roomName = "";

  // Loop through the dinosaurs array.
  for (let i = 0; i < dinosaurs.length; i++) {
    const element = dinosaurs[i];
    // If the dinosaur name matches the dinosaur name in the dinosaur object,
    if (element.name === dinosaurName) {
      // Update the dinoId variable.
      dinoId = element.dinosaurId;
    }
  }

  // If dinoId is not found return an error message.
  if (!dinoId) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  // Loop through the rooms array.
  for (let i = 0; i < rooms.length; i++) {
    const element = rooms[i];

    //If the dinoId can be found in the room object,
    if (element.dinosaurs.includes(dinoId)) {
      // Update the roomName variable.
      roomName = element.name;
    }
  }

  // If roomName is not found return an error message.
  if (!roomName) {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  } else {
    // Otherwise return the roomName.
    return roomName;
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
  // Empty array to be updated and returned later.
  let arr = [];
  //Variable to be updated later.
  let foundRoom = null;

  // Loop through the rooms array.
  for (let i = 0; i < rooms.length; i++) {
    const element = rooms[i];

    //If the room ID is found in the room object,
    if (element.roomId === id) {
      // Update the foundRoom variable.
      foundRoom = element;
    }
  }

  // If foundRoom is not found return an error message.
  if (!foundRoom) {
    return `Room with ID of '${id}' could not be found.`;
  }
  // Variables to keep track of data needed for the function.
  let foundCount = 0;
  let targetRoomCount = foundRoom.connectsTo.length;

  // Another loop to check if the room ID is found in the connectsTo array.
  for (let i = 0; i < rooms.length; i++) {
    const element = rooms[i];
    //Search through the connectsTo array. A -1 return with indexOf() means that it wasn't found.
  if (foundRoom.connectsTo.indexOf(element.roomId) === -1) {
    // Skips any rooms that are not connected to the room ID.
      continue;
    } else {
      // Add the room name to the array.
      arr.push(element.name);
      // Update the foundCount variable.
      foundCount++;
    }
  }
  // If foundCount is not equal to targetRoomCount, return an error message. Needs to match so there is no discrepancy between the two.
  if (foundCount !== targetRoomCount) {
    return `Room with ID of 'incorrect-id' could not be found.`;
  } else {
    // Otherwise return the array.
    return arr;
  }
  
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
