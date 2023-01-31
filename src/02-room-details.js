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
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exi
 * \st in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
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
   // let notfound = '';
  //let dinoName = rooms[0].dinosaurs
  let dinoIds = ''
  for (let i = 0; i < dinosaurs.length; i++){
    if (dinosaurs[i].name === dinosaurName){
      dinoIds = dinosaurs[i].dinosaurId
      } 
    }
    if (!dinoIds){
      return `Dinosaur with name '${dinosaurName}' cannot be found.`
    }
  for (let a = 0; a < rooms.length; a++){
    if (rooms[a].dinosaurs.includes(dinoIds)){
      return rooms[a].name;
      } 
    }
return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`


 
  
}
  
  // // let indvRoom; 
  // const errorMsg = "Dinosaur with name '" + dinosaurName + "' cannot be found."


  // for (const room of rooms){
  //   for (const dino of room.dinosaurs){
  //     if ( dino.name === dinosaurName){
  //       return room.name 
  //     }
  //   } 
  // } return errorMsg

  // for ( const i of dinosaurs){
  //   if ( i.name === rooms.dinosaursId){ 

  //     for (let i=0; i<rooms.length; i++){
  //       if (rooms[i].dinosaur.name === dinosaurName){
           
  //         return rooms[i].name
  //       }
  //       if (dinosaurName === rooms[i]){
  //         return errorMsg;
  //       }
  //     }
  //   } else { 
  //     return errorMsg;
  //   }
      
  //   }
    
  



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
      let foundId = false;
      let connectedRooms = [];
      let roomNames = [];
      let incorrectIds = [];
      let errorMsg = `Room with ID of '${id}' could not be found.`;
    
      for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].roomId === id) {
          foundId = true;
          connectedRooms = rooms[i].connectsTo;
          break;
        }
      }
      if (!foundId) {
        return errorMsg;
      }
      for (let roomId of connectedRooms) {
        let found = false;
        for (let room of rooms) {
          if (room.roomId === roomId) {
            found = true;
            roomNames.push(room.name);
            break;
          }
        }
        if (!found) {
          incorrectIds.push(roomId);
        }
      }
      if (incorrectIds.length) {
        return `Room with ID of '${incorrectIds[0]}' could not be found.`;
      }
      return roomNames;
    }
    

//   let roomsArr = []
//   let errorMsg = `Room with ID of '${id}' could not be found.`
//   //iterate
//   for (i = 0; i < rooms.length; i++){
//     if (rooms[i].id === id){
//       roomsArr.push(room[i].id)
//       return roomsArr;
//   }
 
//   return errorMsg
// }
// }


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
