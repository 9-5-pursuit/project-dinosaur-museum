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
/**
 * I created 2 varaible in this function. One to store the dinosaurId so I could use the value from it in an outside loop. The second variable was used to store the room that the dinosaur can be found in so I could return back the result. Otherwise an error message is given if there's no id found because the given name and the names in the museum don't match. The other error essage is if the room doesn't match the dinosaur even if the dinosaur has been found in the system.
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let id;
  let dinoRoom;
  for(let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurName === dinosaurs[i].name) {
      id = dinosaurs[i].dinosaurId;
    }
  }
  for (let j = 0; j < rooms.length; j++) {
    if (rooms[j].dinosaurs.includes(id)) {
      dinoRoom = rooms[j].name;
    }
  }
  if (!id) {
  return `Dinosaur with name '${dinosaurName}' cannot be found.`
  } else if (!dinoRoom) {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  } else {
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
/**
 * I created 2 empty arrays. One is meant to store the values of the rooms that connect to the given room and if they don't then the id cannot be found. Once the values are store I used the new array they are stored in inside a for loop where I set a variable to be false unless the rooms in the new array match the rooms roomIds. If they are all found then the values are pushed onto an array as the rooms names instead and if they are not all found then and error message is given since found came out to be false.
 */
function getConnectedRoomNamesById(rooms, id) {
  let connectedArray = [];
  let connectedNames = [];
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].roomId === id) {
        connectedArray = rooms[i].connectsTo;
      }
    }
    if (connectedArray.length === 0) {
      return `Room with ID of '${id}' could not be found.`;
    }
    for (let i = 0; i < connectedArray.length; i++) {
      let found = false;
      for (let j = 0; j < rooms.length; j++) {
        if (rooms[j].roomId === connectedArray[i]) {
          found = true;
          connectedNames.push(rooms[j].name);
        }
      }
      if (found === false) {
        return `Room with ID of '${connectedArray[i]}' could not be found.`;
      }
    }
    return connectedNames;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
