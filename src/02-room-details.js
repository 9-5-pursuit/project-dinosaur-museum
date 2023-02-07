/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

// ---------------------------- FIRST FUNCTION ---------------------------- //
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
  let roomWithDino;
  let dinoId;

  // Loop through the dinosaurs array and if the dinosaurs name is equal to the dynamic name set the dinosaur id to the new array.
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurName === dinosaurs[i].name) {
      dinoId = dinosaurs[i].dinosaurId;
    }
  }

  // Loop through the rooms array and if the dinosaur id if a dinosaur is is found in any room the room name is assigned to the new variable roomWithDino.
  for (let j = 0; j < rooms.length; j++) {
    if (rooms[j].dinosaurs.includes(dinoId)) {
      roomWithDino = rooms[j].name;
    }
  }
  // If the dinosaur id can't be found, return an error message.
  if (!dinoId) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
    // Id the dinosaur id can't be found in any room, return an error message.
  } else if (!roomWithDino) {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  } else {
    // If the condition above is not fulfilled, return the room name.
    return roomWithDino;
  }
}

// ---------------------------- SECOND FUNCTION ---------------------------- //
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
  let newArr = [];
  let newName = [];

  // Loop through the rooms array and if the room id is found in any room the connected room will be stored in the new array.
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].roomId.includes(id)) {
      newArr = rooms[i].conectsTo;
    }
  }
  // if the room is empty, return an error message.
  if (newArr.length === 0) {
    return `Room with ID of '${id}' could not be found.`;
  }
  // loop through the new array and set a variable to false and loop again through rooms and if the room id is found in the new array the room name is assigned to newName.
  for (let i = 0; i < newArr.length; i++) {
    let dinoFound = false;
    for (let j = 0; j < rooms.length; j++) {
      if (rooms[j].roomId === newArr[i]) {
        dinoFound = true;
        newName.push(rooms[j].name);
      }
    }
    // If no dinosaur id is found in newArray then return an error message.
    if (dinoFound === false) {
      return `Room with ID of '${newArr[i]}' could not be found.`;
    }
  }
  return newName;
}

// function getConnectedRoomNamesById(rooms, id) {
//   let connectedArray = [];
//   let connectedNames = [];
// for (let i = 0; i < rooms.length; i++) {
//   if (rooms[i].roomId === id) {
//     connectedArray = rooms[i].connectsTo;
//   }
// }
// if (connectedArray.length === 0) {
// //   return `Room with ID of '${id}' could not be found.`;
// }
// for (let i = 0; i < connectedArray.length; i++) {
//   let found = false;
//   for (let j = 0; j < rooms.length; j++) {
//     if (rooms[j].roomId === connectedArray[i]) {
//       found = true;
//       connectedNames.push(rooms[j].name);
//     }
//   }
// //   if (found === false) {
//     return `Room with ID of '${connectedArray[i]}' could not be found.`;
//   }
// }
// return connectedNames;
//}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
