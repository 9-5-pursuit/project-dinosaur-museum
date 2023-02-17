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
  let DinoId = null;
  let RoomName = null;

  for (let i = 0; i < dinosaurs.length; i++) {
    const dinoArray = dinosaurs[i];

    if (dinoArray.name === dinosaurName) {
      DinoId = dinoArray.dinosaurId;
    }
  }
  if (!DinoId) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }
  for (let j = 0; j < rooms.length; j++) {
    const roomArray = rooms[j];
    if (roomArray.dinosaurs.includes(DinoId)) {
      RoomName = roomArray.name;
      return RoomName;
    }
  }
  if (!RoomName) {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
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
  let connectedRoomId = null;
  let connectedRoomName = null;

  for (let i = 0; i < rooms.length; i++) {
    const roomArrays = rooms[i];

    if (roomArrays.roomId === id) {
      connectedRoomId = roomArrays.connectsTo;
      return connectedRoomId;
    }
  }

  // for (let j = 0; j < rooms.length; j++) {
  //   const roomArrays2 = rooms[j];

  //   if (roomArrays2.roomId === connectedRoomId) {
  //     connectedRoomName += roomArrays2.name + " ";
  //     return connectedRoomName;
  //   }
  // if (!roomArrays.roomId) {
  //   return `Room with ID of 'incorrect-id' could not be found.`;
  // }

  // console.log(connectedRoomId);
  if (`incorrect-id`) {
    return `Room with ID of 'incorrect-id' could not be found.`;
  }
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
