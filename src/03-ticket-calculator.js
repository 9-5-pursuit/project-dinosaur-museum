/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
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
/**
 * In this function I set up a variable I called cost to return at the end. I set up 2 if statements for if the ticket can't be found or if the entrant can't be found. the cost is then calculated from ticketData, the given object, and any extras are checked for existing inside a for loop. after that the total cost is calculated since we need to add on extras now and then we return the total cost at the end.
 */
    function calculateTicketPrice(ticketData, ticketInfo) {
      let cost = 0;
      if (ticketInfo.ticketType !== "general" && ticketInfo.ticketType !== "membership") {
        return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
      }
      if (ticketInfo.entrantType !== "child" && ticketInfo.entrantType !== "adult" && ticketInfo.entrantType !== "senior") {
        return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
      }
      cost += ticketData[`${ticketInfo.ticketType}`].priceInCents[`${ticketInfo.entrantType}`];
      for (let i = 0; i < ticketInfo.extras.length; i++) {
        if (ticketInfo.extras[i] !== "movie" && ticketInfo.extras[i] !== "education" && ticketInfo.extras[i] !== "terrace") {
          return `Extra type '${ticketInfo.extras[i]}' cannot be found.`;
        }
        cost += ticketData.extras[`${ticketInfo.extras[i]}`].priceInCents[`${ticketInfo.entrantType}`];
      }
      return cost;
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
/**
 * This was a doozy. I set up multiple variables for the amount of string manipulation that will need to take place just to make things easier on myself. Sorry if it looks chaotic. I set up a for loop to check if the cost is a number when it comes in from the previous function and if it is not then we return the cost. if it is a number we add it to total cost. the i set up a way to capitalize the first and second words appropriately and stored them in item. by the end the whole receipt is made.
 */
function purchaseTickets(ticketData, purchases) {
  let totalCost = 0;
  const receiptGreeting = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`;
  let item = "";
  let receipt = "";

  for (let i = 0; i < purchases.length; i++) {
    let cost = calculateTicketPrice(ticketData, purchases[i]);
    if (typeof cost !== "number") {
      return cost;
    }
    totalCost += cost;

    let entrant = `${purchases[i].entrantType}`;
    let capitalizeEntrant = entrant.charAt(0).toUpperCase() + entrant.slice(1);
    let ticket = `${purchases[i].ticketType}`;
    let capitalizeTicket = ticket.charAt(0).toUpperCase() + ticket.slice(1);
    item += `${capitalizeEntrant} ${capitalizeTicket} Admission: $${(cost / 100).toFixed(2)}`;

    if (purchases[i].extras.length > 0) {
      let extraAccess = "";
      for (let j = 0; j < purchases[i].extras.length; j++) {
        extraAccess += ticketData.extras[`${purchases[i].extras[j]}`].description;
        if (j !== purchases[i].extras.length - 1) {
          extraAccess += ", ";
        }
      }
      item += ` (${extraAccess})`;
    }
    item += "\n";
  }
  let bottomOfReceipt = `-------------------------------------------\nTOTAL: $${(totalCost / 100).toFixed(2)}`;
  receipt = receiptGreeting + item + bottomOfReceipt;
  return receipt;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
