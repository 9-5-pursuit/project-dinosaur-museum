/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { extras } = require("../data/tickets");
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
  let person = ticketInfo.entrantType; // stores the entrant type listed in the ticketInfo parameter.
  let extras = ticketInfo.extras; // stores the extras array listed in the ticketInfo parameter.
  if (!ticketData[ticketInfo.ticketType]) { // => returns an error if the ticket type was incorrect.
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }
  if (!ticketData[ticketInfo.ticketType].priceInCents[person]) { // => returns an error if the entrant listed in the ticket info was incorrect.
    return `Entrant type '${person}' cannot be found.`;
  }
  let totalPrice = ticketData[ticketInfo.ticketType].priceInCents[person]; // stores the price of the ticket before adding extras.
  if (extras) {
    for (const extra of extras) { // => adds the price of each extra in the extras array.
      if (!ticketData.extras.hasOwnProperty(extra)) { // => if the extra does not exist in the array of extras within the ticketdata parameter, this returns an error.
        return `Extra type '${extra}' cannot be found.`;
      }
      totalPrice += ticketData.extras[extra].priceInCents[person];
    }
  }
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
  let price; // stores the price of each ticket.
  let finalPrice = 0; // stores the total price of all tickets purchased in the purchases parameter.
  let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`; // begins the formatting of the receipt and stores it.
  for (const purchase of purchases) { // => calculates the price and formats the receipt accordingly for each ticket purchased in the purchases array.
    price = calculateTicketPrice(ticketData, purchase);// uses the previous function to calculate the price of the ticket.
    if (typeof price === 'string') { // => if one of the errors from the previous function is triggered, price will be set to that error and returned.
      return price;
    } else { // => formats all the information from the purchased ticket and adds the properly formatted text to the receipt.
      receipt += `${purchase.entrantType[0].toUpperCase()+purchase.entrantType.slice(1)} ${purchase.ticketType[0].toUpperCase()+purchase.ticketType.slice(1)} Admission: $${(price/100).toFixed(2)}`;// really starting to hate text formatting right now.
      if (purchase.extras.length) {// => if any extras were purchased, formats and adds to receipt.
        let extraText = '';// stores the formatted extras text.
        for (const extra of purchase.extras) {
          extraText += `${extra[0].toUpperCase()+extra.slice(1)} Access, `;// reeeaaally hating text.
        }
        extraText = extraText.slice(0, -2);
        receipt += ` (${extraText})`;
      }
      receipt+=`\n`;
      finalPrice += price;// stores the total cost for (you guessed it) later formatting.
    }
  }
  receipt += `-------------------------------------------\nTOTAL: $${(finalPrice/100).toFixed(2)}`;
  return receipt;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
