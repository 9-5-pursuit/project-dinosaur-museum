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
const getRoomByDinosaurName = (dinosaurs, rooms, dinosaurName) => {
  // use map to store the id and name of each dinosaur for efficient lookup
  const dinoMap = dinosaurs.reduce((acc, dino) => {
    acc[dino.name] = dino.dinosaurId;
    return acc;
  }, {});

  // check if the dinosaur is in the map
  if (!dinoMap[dinosaurName]) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  // check if the dinosaurId is in any of the rooms
  const roomFound = rooms.find((room) =>
    room.dinosaurs.includes(dinoMap[dinosaurName])
  );

  if (roomFound) {
    return roomFound.name;
  }

  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
};

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
const getConnectedRoomNamesById = (rooms, id) => {
  // Find room with matching roomId
  const roomFound = rooms.find((room) => room.roomId === id);

  // Return error message if room is not found
  if (!roomFound) return `Room with ID of '${id}' could not be found.`;

  // Initialize errors array
  let errors = [];
  // Get ids of rooms that the room with matching id connects to
  const connRooms = roomFound.connectsTo.map((roomId) => {
    // Find room with matching roomId
    const room = rooms.find((r) => r.roomId === roomId);
    // Return error message if room is not found
    if (!room) {
      errors.push(`Room with ID of '${roomId}' could not be found.`);
    } else {
      // Return name of room if room is found
      return room.name;
    }
  });

  // If errors array has any elements, return error message as a string
  if (errors.length > 0) {
    return errors.join(", ");
  } else {
    // Return array of room names
    return connRooms;
  }
};

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
