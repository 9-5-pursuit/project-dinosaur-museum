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
  
  let roomByDinosaurName, dinoId;
  //console.log(rooms)
  for (let x = 0; x < dinosaurs.length; x++) {
    if (dinosaurs[x].name === dinosaurName) {
      dinoId = dinosaurs[x].dinosaurId;
    }
  }
  for (let y = 0; y < rooms.length; y++) {
    if (rooms[y].dinosaurs.includes(dinoId)) {
      roomByDinosaurName = rooms[y].name;
    }
  }
  if (!dinoId) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  } else if (!roomByDinosaurName) {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  } else {
    return roomByDinosaurName;
  }
}

  

    
  // console.log(dinoRoom)

// return "Dinosaur with name 'Pterodactyl' cannot be found."
// }

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

// console.log(rooms)
  let result = [];
  let foundRoom = null;

  for (let i = 0; i < rooms.length; i++) {
    // Find room with matching roomId
    const element = rooms[i]
    if (element.roomId === id) {
      foundRoom = element;
    } 
    if (!foundRoom) {
      // console.log(rooms[y])
      return `Room with ID of '${id}' could not be found.`;
    } // return arrayOfRoomNames;
  }
   let findingCount = 0;
    let targetRoom = foundRoom.connectsTo.length;
   for (let j = 0; j < rooms.length; j++){ 
    let element = rooms[j];
    if (foundRoom.connectsTo.indexOf(element.roomId) === -1) {
    continue;
   } else {
    result.push(element.name);
    findingCount++;
    }
    if (findingCount !== targetRoom) {
      return "Room with ID of 'incorrect-id' could not be found.";
    } else {
      return result;
    }
  }
}




module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
