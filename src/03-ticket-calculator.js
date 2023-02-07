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
   // Extract keys from ticketInfo with destructuring
   // let ticketType = ticketInfo.ticketType
   let { ticketType, entrantType, extras } = ticketInfo;

   // ticket type does not match an existing ticket type
   if (!ticketData[ticketType])
     return `Ticket type '${ticketType}' cannot be found.`;
 
   // entrant type does not match an existing entrant type
   if (!ticketData[ticketType]["priceInCents"][entrantType])
     return `Entrant type '${entrantType}' cannot be found.`;
 
   // Retrieve the base price by navigating the ticketData object
   let basePrice = ticketData[ticketType]["priceInCents"][entrantType];
   // Setup an accumulator for the extras pricing since it's an array of options
   let extrasPrice = 0;
   // Run through all the extras options
   for (let extra of extras) {
     // Short circuit the function with an error message if an extra doesn't exist.
     if (!ticketData["extras"][extra]) {
       return `Extra type '${extra}' cannot be found.`;
     }
     // Otherwise update the extras price by traversing the ticketData object
     else {
       extrasPrice += ticketData["extras"][extra]["priceInCents"][entrantType];
     }
   }
 
   // Final value should be the total of the base price and extras price
   return basePrice + extrasPrice;
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
let lineItems = "";
let totalCost = 0;
for (let purchase of purchases) {
  
  // using the previous calculateTicketPrice function store the price in a variable. It should also return an error if a ticketType or entrantType or extra is not found
  let purchasePrice = calculateTicketPrice(ticketData, purchase);

  // check the type of purchasePrice to see if we got an error. if so stop the function and return erroe.
  if (typeof purchasePrice === "string") return purchasePrice;

  // setup an accumulator for this line item string
  let purchaseLineItem = "";

  // formatted example
  // Adult General Admission: $50.00 (Movie Access, Terrace Access)

  // get the entratType and format the first letter capitalized
  let entrantType = purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1).toLowerCase();

  // get the ticketType and format the first letter capitalized
  let ticketType = purchase.ticketType[0].toUpperCase() + purchase.ticketType.slice(1).toLowerCase();

  // update the purchaseLineItem to include the ticket information we already have entrant type, ticket type, price
  purchaseLineItem += `${entrantType} ${ticketType} Admission: $${(purchasePrice / 100).toFixed(2)}`;

  // check if we have any extras
  if (purchase.extras.length > 0) {
    // set up an accumulator for the extras string
    let extras = "";
    for (let i = 0; i < purchase.extras.length; i++) {
      let extra = purchase.extras[i];
      extras += extra[0].toUpperCase() + extra.slice(1).toLowerCase() + " Access";

      // if we are not on the last item in the array add a comma and space
      if (i < purchase.extras.length - 1) {
        extras += ", ";
      }
    }
    // add our extras to the purchase line item
    // update format to match 
    purchaseLineItem += ` (${extras})`;
  }
  // add our line spacer when we are done building the purchase line item
  purchaseLineItem += "\n";

  // update lineItems and totalCost accumulator
  lineItems += purchaseLineItem;
  totalCost += purchasePrice;
  //console.log(lineItems)
}
 return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${lineItems}-------------------------------------------\nTOTAL: $${(totalCost / 100).toFixed(2)}`;
}
// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
