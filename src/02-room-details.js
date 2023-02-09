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

// default value is string - error msg ? <- nevermind
// returns name of room where given dino can be found, if it doesnt exist return error msg
// `Dinosaur with name 'Pterodactyl' cannot be found.` <- replace pterodactyl with ${dinosaurName}
// two variables, one for dinosaur id and one for room
// first make a loop that goes through dino array and sees if the dinosaur with that id exists
// if statement - if id is valid returns room, else returns the error msg

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
let dinoId = null;
let dinoRoomName = null;

for (let i = 0; i < dinosaurs.length; i++) {
  // goes through dino array
  const dinoArr = dinosaurs[i];
  // console.log(dinoArr);
  if (dinoArr.name === dinosaurName) {
    dinoId = dinoArr.dinosaurId;
  }
  // console.log(dinoId);
} // else {
  
// }

  if (!dinoId) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  // console.log(dinoId);

for (let r = 0; r < rooms.length; r++) {
  // if id exists, returns room
  const dinoArr = rooms[r];
  // console.log(dinoArr);
  if (dinoArr.dinosaurs.includes(dinoId)) {
     // .includes()
    // console.log(dinoArr);
    // console.log(dinoId);
    dinoRoomName = dinoArr.name;
    // console.log(dinoRoomName);
  }
  // console.log(dinoRoomName);
}

// console.log(dinoRoomName);
  if (!dinoRoomName) {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  } else {
    return dinoRoomName;
}

}


// console.log(getRoomByDinosaurName(exampleDinosaurData, exampleRoomData))



// console.log(getRoomByDinosaurName(exampleDinosaurData, exampleRoomData));
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


// returns array of strings, each string is the name of a room connected to given room name
// if room id cant be found, returns error msg
// "should return the names of all rooms connected to the given room by ID"
// "should work for other rooms"
// "if initial room ID is incorrect, should return an error message"
// "if connected room ID is incorrect, should return an error message"
// error msg - "Room with ID of 'incorrect-id' could not be found."
// loop that goes through rooms array and checks for room ids and returns array of strings
// two initial variables needed, one for rooms and one for id (?)

function getConnectedRoomNamesById(rooms, id) {

let roomCheck = null; // either null or undefined
let idCheck = [];

for (let i = 0; i < rooms.length; i++) {
  const roomsArr = rooms[i];
  // console.log(roomsArr);
  // logged entire rooms array
  if (roomsArr.roomId === id) {
    // roomsArr.roomId === id
    // console.log(roomsArr);
    roomCheck = roomsArr
    // console.log(roomsArr);
  }
}

  if (!roomCheck) {
    return `Room with ID of 'incorrect-id' could not be found.`
  }
  // console.log(roomCheck);

 // i got stuck here so i used the answer from the review but am commenting out my old answer so you guys can still see it.

 /* for (let i = 0; i < id.length; i++) {
    const roomsArr = id[i];
    // console.log(roomsArr.connectsTo);
    // connectsTo -> connected rooms
    if (roomsArr.connectsTo) {
      idCheck.push(roomsArr.name)
      roomCheck++;
    }
    console.log(roomCheck);
  }
*/

let foundCount = 0;
let targetRoomCount = roomCheck.connectsTo.length;


for (let i = 0; i < rooms.length; i++) {
  const roomsArr = rooms[i];

    if (roomCheck.connectsTo.indexOf(roomsArr.roomId) === -1) {
      continue;
    } else {
      idCheck.push(roomsArr.name);
      foundCount++
    }
}

  if (foundCount !== targetRoomCount) {
    return `Room with ID of 'incorrect-id' could not be found.`;
  } else {
    return idCheck;
  }


}

// console.log(getConnectedRoomNamesById(exampleDinosaurData, exampleRoomData));

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
