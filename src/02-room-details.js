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
// Declare two variables to hold dinosaur's name and dinosaur's id
let dinosaur;
let dinoId;
  
// Loop through `dinosaurs` array to find dinosaur's id based on dinosaurs's name
    for (let dino of dinosaurs) {
        if (dino.name === dinosaurName) { // If dino's name is found in the `dinosaurs` array, set variables to dino's name and dino's id and break out of loop
            dinosaur = dino.name;
            dinoId   = dino.dinosaurId;
            break; 
        }
    }
    if (dinosaur) {
      // Loop through `rooms` array
        for (let room of rooms) {
          // Loop through `dinosaurs` array in each room in the `rooms` array 
          for (let dinosaur of room.dinosaurs)
          // Checks if the dinosaur's name matches the dinosaur's id and returns the room name as a string     
          if (dinosaur === dinoId) {
                return room.name;
            }
        };
        // Default error messages in case the dinosaur being passed through is not in any room or the museum at all
        return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
    }
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
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
  // Declare two empty arrays to hold connected room ids and names 
  let connectedRoomIds = [];
  let connectedRoomNames = [];

  // Loop through `rooms` array to search for room with a matching `id`
  for (let room of rooms) {
    if (room.roomId === id) {
      connectedRoomIds = room.connectsTo; // Set `connectedRoomIds` array to `connectsTo` property if match is found
      break; // Exit loop when matching room is found
    }
  }
  // Checks if initial room ID is incorrect and returns error message
  if (connectedRoomIds.length === 0) {
    return `Room with ID of '${id}' could not be found.`;
  }
  // Loop through `connectedRoomIds` array
  for (let roomId of connectedRoomIds) {
    let roomFound = false;
    // Loop through `rooms` arrays to find matching `roomId`
    for (let room of rooms) {
      if (room.roomId === roomId) {
        connectedRoomNames.push(room.name); // If room found, add room name to `connectedRoomNames` array 
        roomFound = true; // Switch roomFound to true if room is found
        break; // End loop if matching room is found
      }
    }
    // Checks if connected room ID is incorrect and returns error message
    if (!roomFound) {
      return `Room with ID of '${roomId}' could not be found.`;
    }
  }
  // Returns array with connected room names as strings
  return connectedRoomNames;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
