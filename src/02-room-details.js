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
  let dinosaur = dinosaurs.find(dino => dino.name === dinosaurName); // => uses the find() method to search the dinosaurs array for a dinosaur with the same name as the dinosaurName parameter, and store it in the variable dinosaur.
  if (!dinosaur) { //=> if a dinosaur was not found, dinosaur is undefined, and will return an error.
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }
  let room = rooms.find(findRoom => findRoom.dinosaurs.includes(dinosaur.dinosaurId)); // => uses find() to search every room in the rooms array for one whose dinosaurs include the dinosaurId of the dinosaur we searched for and stores it in the variable room.
  if (!room) { // => returns an error if room was not found.
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }
  return room.name; // returns the name of the located room.
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
  let connectedIds = []; // => an empty array for storing the ids of connected rooms.
  let connectedNames = []; // => an empty array for storing the names of connected rooms.

  for (const room of rooms) { // => checks every room in the rooms array for one with a room id tthat matches the id parameter, then stores the ids of connected rooms in an array
    if (room.roomId === id) {
      connectedIds = room.connectsTo;
    }
  }
  if (connectedIds.length === 0) { // => if no matching room id was found, this will return an error.
    return `Room with ID of '${id}' could not be found.`;
  }
  for (i = 0; i < connectedIds.length; i++) { // => iterates each id connected to the room and searches the room array for a matching room name.
    let roomName;
    for (const room of rooms) {
      if (room.roomId ===connectedIds[i]) {
        roomName = room.name;
      } 
    }
    if (!roomName) { // => if no matching room id was found returns an error.
      return `Room with ID of '${connectedIds[i]}' could not be found.`;
    }
    connectedNames.push(roomName); // adds the room name to an array.
  }
  return connectedNames;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
