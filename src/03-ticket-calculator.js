/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { general } = require("../data/tickets");
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
function calculateTicketPrice(ticketData, ticketInfo) {
  let finalPrice = 0;
  //console.log(ticketData);
  //console.log(ticketInfo);
  //--------------------Error Handling-----------------//
  if (ticketInfo.ticketType === "incorrect-type") {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  } else if (ticketInfo.entrantType === "incorrect-entrant") {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  } else if (ticketInfo.extras[0] === "incorrect-extra") {
    return `Extra type '${ticketInfo.extras[0]}' cannot be found.`;
  }
  //------------------------------------------------------//
  /*Loops through tickets object that has the properties
    "general", 'membership' and extras
   HIGHLIGHT (NOTE: extras has objects within itself that
    we need to cycle through)*/

  //-----------Checks the ticket type-----------//
  if (ticketInfo.ticketType === "general") {
    for (let ent in ticketData.general.priceInCents) {
      //console.log(ent);
      if (ent === ticketInfo.entrantType) {
        finalPrice += ticketData.general.priceInCents[ent];
      }
    }
  } else if (ticketInfo.ticketType === "membership") {
    for (let x in ticketData.membership.priceInCents) {
      if (x === ticketInfo.entrantType) {
        finalPrice += ticketData.membership.priceInCents[x];
      }
    }
  }

  //------------Now to apply extras--------------------//
  //Loops through the ticketInfo extras array

  for (let p = 0; p < ticketInfo.extras.length; p++) {
    //Loops through the ticket database to check the extras
    // are in the database

    for (let key in ticketData.extras) {
      //e.g movie
      //console.log(key);
      if (key === ticketInfo.extras[p]) {
        //console.log("The extras match");

        for (let keyX in ticketData.extras[key].priceInCents) {
          if (keyX === ticketInfo.entrantType) {
            finalPrice += ticketData.extras[key].priceInCents[keyX];
          }
        }
      }
    }
  }
  // 😐
  //console.log(finalPrice);
  return finalPrice;
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
function purchaseTickets(ticketData, purchases) {
  //------------Land of Variables-------------------------//
  let finalString = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`;
  let totalPrice = 0;
  let indPrice;
  let firstChar;
  let restChar;
  let additionalCost = 0;
  let formattedEntrantType;
  let descript = "";
  let formatArr = [];
  //------------------------------------------------------//
  // console.log(finalString);
  //console.log(purchases);

  //----------------------Error Handling----------------------//
  for (let a = 0; a < purchases.length; a++) {
    if (purchases[a].ticketType === "incorrect-type") {
      return `Ticket type '${purchases[a].ticketType}' cannot be found.`;
    } else if (purchases[a].entrantType === "incorrect-entrant") {
      return `Entrant type '${purchases[a].entrantType}' cannot be found.`;
    } else if (purchases[a].extras[0] === "incorrect-extra") {
      return `Extra type '${purchases[a].extras[0]}' cannot be found.`;
    }
  }
  //-------------------------------------------------------------//

  for (let b = 0; b < purchases.length; b++) {
    //Loops through purchase array
    if (purchases[b].extras.length === 0) {
      for (let key in ticketData) {
        //console.log(key);
        //----------No extras----------------//

        if (key === purchases[b].ticketType) {
          //----------The Formatter--------------------//
          firstChar = purchases[b].entrantType[0].toUpperCase();
          restChar = purchases[b].entrantType.slice(1).toLowerCase();
          formattedEntrantType = firstChar + restChar;
          //--------------------------------------------//

          for (let aK in ticketData[key].priceInCents) {
            //console.log(aK);
            //aK = child
            //   = senior
            //   = adult
            if (aK === purchases[b].entrantType) {
              if (purchases[b].extras.length === 0) {
                //--------------------no extras-------------------//
                indPrice = ticketData[key].priceInCents[aK] / 100;
                totalPrice += ticketData[key].priceInCents[aK] / 100;
                finalString += `${formattedEntrantType} ${
                  ticketData[key].description
                }: $${indPrice.toFixed(2)}\n`;
              }
            }
          }
        }
      }
    } else {
      //----------------------------------------------------------------//
      indPrice = 0; //reset the indPrice for the next ticket
      descript = "";
      additionalCost = 0;
      formatArr = [];

      //----------The Formatter--------------------//
      firstChar = purchases[b].entrantType[0].toUpperCase();
      restChar = purchases[b].entrantType.slice(1).toLowerCase();
      formattedEntrantType = firstChar + restChar;
      //--------------------------------------------//

      for (let keyH in ticketData) {
        //keyH = general
        //     = membership
        //     = extras
        if (purchases[b].ticketType === keyH) {
          for (let keyP in ticketData[keyH].priceInCents) {
            //keyP = child
            //     = adult
            //     = senior
            if (purchases[b].entrantType === keyP) {
              indPrice += ticketData[keyH].priceInCents[keyP] / 100;
              descript = ticketData[keyH].description;
            }
          }
        }
      }
      if (purchases[b].extras.length === 1) {
        for (let keyG in ticketData.extras) {
          //keyG = terrace
          //     = education
          //     = movie
          if (purchases[b].extras[0] === keyG) {
            //descript = ticketData.extras[keyG].description;
            for (let keyF in ticketData.extras[keyG].priceInCents) {
              //keyF = child
              //     = adult
              //     = senior

              if (keyF === purchases[b].entrantType) {
                additionalCost +=
                  ticketData.extras[keyG].priceInCents[keyF] / 100;
                indPrice += additionalCost;
                ticketData.extras[keyG].priceInCents[keyF] / 100;
                finalString += `${formattedEntrantType} ${descript}: $${indPrice.toFixed(
                  2
                )} (${ticketData.extras[keyG].description})\n`;
              }
            }
          }
        }
      } else if (purchases[b].extras.length === 2) {
        for (let r = 0; r < purchases[b].extras.length; r++) {
          //Loops through extras
          for (let keyD in ticketData.extras) {
            //keyD = terrace
            //     = education
            //     = movie
            if (keyD === purchases[b].extras[r]) {
              formatArr.push(ticketData.extras[keyD].description);
              for (let keyL in ticketData.extras[keyD].priceInCents) {
                //keyL = child
                //     = adult
                //     = senior
                if (keyL === purchases[b].entrantType) {
                  additionalCost +=
                    ticketData.extras[keyD].priceInCents[keyL] / 100;
                  //indPrice += additionalCost;
                }
              }
            }
          }
        }

        let formStr = `${formatArr[0]}, ${formatArr[1]}`;

        indPrice += additionalCost;
        finalString += `${formattedEntrantType} ${descript}: $${indPrice.toFixed(
          2
        )} (${formStr})\n`;
      } else if (purchases[b].extras.length === 3) {
        for (let g = 0; g < purchases[b].extras.length; g++) {
          for (let keyB in ticketData.extras) {
            if (keyB === purchases[b].extras[g]) {
              formatArr.push(ticketData.extras[keyB].description);
              for (let keyT in ticketData.extras[keyB].priceInCents) {
                if (keyT === purchases[b].entrantType) {
                  additionalCost +=
                    ticketData.extras[keyB].priceInCents[keyT] / 100;
                }
              }
            }
          }
        }
        let formStr = `${formatArr[0]}, ${formatArr[1]}, ${formatArr[2]}`;
        indPrice += additionalCost;
        finalString += `${formattedEntrantType} ${descript}: $${indPrice.toFixed(
          2
        )} (${formStr})\n`;
      }

      //indPrice += additionalCost;
      totalPrice += indPrice;
    }
  }
  //------------------------with extras----------------------------//

  //for (let e = 0; e < purchases.length; e++) {}

  //-------------------Formatting------------------------------------//
  //totalPrice = totalPrice;

  finalString += `-------------------------------------------\nTOTAL: $${totalPrice.toFixed(
    2
  )}`;
  //console.log(totalPrice);
  //console.log(finalString);
  return finalString;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
