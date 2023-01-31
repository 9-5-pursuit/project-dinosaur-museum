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

    for (let i = 0; i < dinosaurs.length; i++) {
      // this is looping through the dinosaurs array

        if (dinosaurs[i].name === dinosaurName) {
          // this is confirming that the name given within the parameter is also the name provided in dinosaurs data

          let id = dinosaurs[i].dinosaurId
          // creating a variable to store the id for the dinosaurs
          // console.log(id)

        for (let j = 0; j < rooms.length; j++) {
          // this is looping through the rooms array

          if (rooms[j].dinosaurs.includes(id)) {
            // this is checking if the id matches to the id in rooms

            return rooms[j].name
            // returns the name of the room that the dinosaur is in

          }
          
        }
        
      } 

    }

    for (let i = 0; i < dinosaurs.length; i++) {

      if (dinosaurs[i].name === dinosaurName) {

        return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
        // return this is the dinosaurs name exist but is not placed in any room
  
      } 
      
    }


    if (dinosaurs.name !== dinosaurName) {

      return `Dinosaur with name '${dinosaurName}' cannot be found.` 
        // return this is the name does not exist 

    }

  }

  //   let id = null
  //   // id is global scope to the function
  //   // when logged directly underneath it will log "null"
  //   // when logged after the for loop, the id remains global scope therefore its allowed to be redeclared, the information remains stored and its allowed to be used outside of where the information changed. 

  //   // console.log(id)
  //   for (let i = 0; i < dinosaurs.length; i++) {
  //     // this is looping through the dinosaurs array

  //       if (dinosaurs[i].name === dinosaurName) {
  //         // this is confirming that the name given within the parameter is also the name provided in dinosaurs data
  //         id = dinosaurs[i].dinosaurId
  //         // creating a variable to store the id for the dinosaurs
  //         // console.log(id)
  //     } 
  //   }
  //   // console.log(id)

  // if (id == null) {
  //   return `Dinosaur with name '${dinosaurName}' cannot be found.`
  // }
  // for (let i = 0; i < rooms.length; i++) {
  //         // this is looping through the rooms array
  //         if (rooms[i].dinosaurs.includes(id)) {
  //           // this is checking if the id matches to the id in rooms

  //           return rooms[i].name
  //           // returns the name of the room that the dinosaur is in
  //         }
  //       }
  // return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  //       // return this is the name does not exist 
  // }

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

  let connectedArr = []

  let arrNames = []

  for (let i = 0; i < rooms.length; i++) {

    if (rooms[i].roomId === id) {

      connectedArr = rooms[i].connectsTo;

    }
    
  }

  if (connectedArr.length === 0) {

    return `Room with ID of 'incorrect-id' could not be found.`;

  }

  for (let i = 0; i < connectedArr.length; i++) {

    let found = false;

    for (let j = 0; j < rooms.length; j++) {
      
      if (rooms[j].roomId === connectedArr[i]) {

        found = true;
        arrNames.push(rooms[j].name);

      }
      
    }

    if (found === false ) {

      return `Room with ID of 'incorrect-id' could not be found.`;
    }
    
  }

  return arrNames

}

  // let result;

  // let connectedArr = [];

  // let connected = []


  // for (let i = 0; i < rooms.length; i++) {

  //   if ((id !== rooms[i].connectsTo)) {

  //     result =  `Room with ID of 'incorrect-id' could not be found.`
  
  //   } 

  // }
  // // this loop is supposed to take out any initial ids that do not match

  // for (let i = 0; i < rooms.length; i++) {
      
  //   if (id === rooms[i].roomId) {
      
  //     connected = rooms[i].connectsTo

  //   }
    
  //   if (connected !== rooms[i].connectsTo) {

  //     result = `Room with ID of 'incorrect-id' could not be found.`

  //   }
    
//   }
//   // this loop is supposed to check if the array of rooms the paramater "id" has is EXACTLY the same as the array of rooms from the array of object "rooms"


//   for (let i = 0; i < rooms.length; i++) {

//     if (rooms[i].connectsTo.includes(id)) {

//       connectedArr.push(rooms[i].name);
      
//       result =  connectedArr

//     }
    
//   }
//   // this loop is to return the desired result which is the array of the names of the connected rooms

//   return result

// }
// // ================================================================================================
  

  
  



    //   for (let j = 0; j < rooms.length; j++) {

    // if (!rooms[i].roomId.includes(id)) {
    //   return "Room with ID of 'incorrect-id' could not be found."
    // } 
    
  // }

    


// }


























  // console.log(id)

  // let arrNames = []
//   // created this a
//   let connected = []
  
// // console.log(rooms[0].connectsTo)



//   for (let i = 0; i < rooms.length; i++) {
//     // we are going to loop through the rooms array
//     // the purpose of this loop is to be able to find the id that was provided to be the same as the id in the roomId.

//     if (rooms[i].roomId.includes(id)) {
//       // (id === rooms[i].roomId)
//       // the condition is that the id provided and the id in the given data are the exact same

//       // console.log(id) 
//       // the ids provided are being logged which means it is going in except for the "incorrect-id"
//       // this means i just need to focus on the ones that are going through and not the errors

//         connected = rooms[i].connectsTo
//       // console.log(connected)
//       }

//       // console.log(connected)

//       for (let j = 0; j < connected.length; j++) {
//         // looping through the array connected
//         console.log(connected)
//         console.log(rooms[i])
        
//         if(connected[j] === rooms[i].roomId) {

//           arrNames.push(rooms[i].name)
//           // return arrNames
//           // console.log(arrNames)
          


//           // connected[j] = rooms[i].roomId
          

//           // return connected
//           // console.log(connected)
//           // console.log(arrNames)
// // console.log(arrNames)
//         }
      
        

//     }

    


//   }




  // for (let i = 0; i < rooms.length; i++) {

  //   if(rooms[i].connectsTo.includes(id)) {

  //       connected.push(rooms[i].connectsTo)
  //   }
  //   console.log(connected)
  // }

 
  























module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
