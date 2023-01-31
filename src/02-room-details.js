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

/* --------------- NAME WHERE DINOS CAN BE FOUND -------------------
- 1. created var for dinoId to find dinos in room will reassign later
- 2. created an var for dinoRoom where dinos can be found
- 3. created a for loop
    - index stared at 0; as long as i is is less than the length of dinos array; increment index
    - if statement;
      - if dinoname from parameters equals dino[i] then dinoId equqal dinos[i]dinoId
- 4. if staement
    - if no dinoId then return string (error msg)
- 5. another for loop
    - j starts at index 0; as long s j is less than room length array; increment j
    - if statement
      if room at j index in dinos array includes dinoId from var then dino room equals room name at j index 
      - return reassigned dino room
- 6. outside of the loop return dino with name not found in any room string if no condition true

*/
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  
  let dinoId;
  let dinoRoom;

  for (let i = 0; i < dinosaurs.length; i++) {

    if (dinosaurName === dinosaurs[i].name) {

      dinoId = dinosaurs[i].dinosaurId;

    }
  }

  if (!dinoId) {

    return `Dinosaur with name '${dinosaurName}' cannot be found.`

  }

  for (let j = 0; j < rooms.length; j++) {

    if (rooms[j].dinosaurs.includes(dinoId)) {

      dinoRoom = rooms[j].name

      return dinoRoom

    }
  }

  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`

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

/* ---------- ARRAY OF STRINGS FOR ROOM CONNECTED TO GIVEN ROOM ------------------
- 1. created a var for connectedrooms array that will pass a value to
- 2. started for loop
      - started index at 0; as long as index is less that rooms array length; increment index
      - created an if statement 
        - if id given in parameters is equal to rooms id at index i then created nested for loop
          - j starts at index 0 in the rooms index i connects to array
          - as long as j is less than i increment j
          - then pushed rooms index i connected to j into connected rooms array
- 3. created a var for connected rooms id
- 4. started another for loop starting at k
      - k starting at index 0 in connected rooms array; as long as less than connectedrooms array; increment k
      - reassigned connected room id var to equal connected rooms array at index k
- 5. started a nested loop where l is equal to index 0; as long as l is less than rooms array; increment l
      - if statement
        - if connected room id is equal to rooms id at index l then connected rooms at index k is equal to rooms name at index l
      - else if connected roms at index k equals to incorrect id thejn return string starting room id cannot be found
- 6. created a ternary op so if connected rooms to return connected room if not retrn id cannot be found string.
*/
function getConnectedRoomNamesById(rooms, id) {

  let connectedRooms = [];

  for (let i = 0; i < rooms.length; i++) {

    if (id === rooms[i].roomId) {
      
      for (let j = 0; j < rooms[i].connectsTo.length; j++) {

        connectedRooms.push(rooms[i].connectsTo[j]);

      }
    }
  }

  let connectedRoomId;

  for (let k = 0; k < connectedRooms.length; k++) {

    connectedRoomId = connectedRooms[k];

    for (let l = 0; l < rooms.length; l++) {

      if (connectedRoomId === rooms[l].roomId) {

        connectedRooms[k] = rooms[l].name;

      } else if (connectedRooms[k] === "incorrect-id") {

        return `Room with ID of '${connectedRooms[k]}' could not be found.`
    
      }
    }
  }

  return connectedRooms.length ? connectedRooms : `Room with ID of '${id}' could not be found.` ;

}
  


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
