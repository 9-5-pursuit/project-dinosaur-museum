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
function calculateTicketPrice(ticketData, ticketInfo) {
  // Grab ticket type from the `ticketData` object being passed into function
  let ticket = ticketData[ticketInfo.ticketType];
  // If ticket type does not match an existing ticket type, return error message
  if (!ticket) return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  
  // Grab price based on age from the `ticketInfo` object being passed into function
  let price = ticket.priceInCents[ticketInfo.entrantType];
  // If entrant type does not match an existing entrant type, return error message
  if (!price) return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  
  // Set price before final calculation at base price of ticket
  let totalPrice = price;
  
  // Loop through `ticketInfo.extras`
  for (let extra of ticketInfo.extras) {
    // Store cost of specific extra
    let extraCost = ticketData.extras[extra];
    // If extra type does not match an existing extra type, return error message
    if (!extraCost) return `Extra type '${extra}' cannot be found.`;
    // Add extras cost to `totalPrice`
    totalPrice += extraCost.priceInCents[ticketInfo.entrantType];
  }
  // Return final price as number
  return totalPrice;
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
    // Start the receipt with a string
    let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------`;
    
    // Set total price at default before adding cost
    let total = 0;
    
    // Loop through `purchases` array passed into function
    for (let ticket of purchases) {
      // Calculate ticket price by using function created for last problem
      let ticketPrice = calculateTicketPrice(ticketData, ticket);
      
      // Should surface errors from calculateTicketPrice()
      if (typeof ticketPrice === 'string')
        return ticketPrice;
  
      // Add ticket info to receipt with correct formatting
      receipt += `\n${(ticket.entrantType.charAt(0).toUpperCase() + ticket.entrantType.slice(1))} ${ticketData[ticket.ticketType].description}: $${(ticketPrice / 100).toFixed(2)}`;
  
      // Check if ticket has any extras
      if (ticket.extras.length > 0) {
        // Creat empty array to hold extras
        let extras = [];
        // Loop through `extras` array in purchases and add descriptions to empty array
        for (let extra of ticket.extras)
          extras.push(ticketData.extras[extra].description);
        // Add `extras` info to receipt
        receipt += ` (${extras.join(', ')})`;
      }
      // Add ticket price to total cost
      total += ticketPrice;
    }
    // Returns a full receipt as a string, with each individual ticket bought and the total cost
    return receipt + `\n-------------------------------------------\nTOTAL: $${(total / 100).toFixed(2)}`;

  }
// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
