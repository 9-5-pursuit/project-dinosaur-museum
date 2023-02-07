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

  // Extraction of keys from ticketInfo with destructing methode.
  let { ticketType, entrantType, extras } = ticketInfo;
  //  conditional code's line to checkc if the ticket type doesn't match to an existing one.
  if (!ticketData.[ticketType] || ticketData.[ticketType] === "extras") {
    return "Ticket type 'incorrect-type' cannot be found.";
  }
  //  conditional code's line to checkc if the entrant type doesn't match to an existing one.
 
  if (!ticketData[ticketType]["priceInCents"][entrantType]) {
    return "Entrant type 'incorrect-entrant' cannot be found.";
  }
  // code's line to allow the navigation of the ticketData object to retrieve the bas price.

  let basePrice = ticketData[ticketType]["priceInCents"][entrantType];
  // since the extra pricing is an array let setup an accumulator for it.
  let extraPrice = 0;
  // Using an for .... loop to run trough the extra options.
  for (let extra of extras) {
  //cutting off the fuction with a conditional statement with an error mesage if an extra doesn't exixst. 
    if (!ticketData["extras"][extra]) {
      return "Extra type 'incorrect-extra' cannot be found.";
    }
    // Update the extras price by traversing through to the tiketData Object.
    extraPrice += ticketData["extras"][extra]["priceInCents"][entrantType]; 
  }
// Returning the final value that is the total of the base price and the extra price.
  return basePrice + extraPrice;  

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
  for (let purchase of purchases){ 
  /**  Using the previous calculateTicketPrice() ufnction, store the price in a variable. 
  This should also return an error if a ticketType or entranType or "extra" isn't found.
*/
  let purchasePrice = calculateTicketPrice(ticketData, purchase) ;

  /** Checking the type of pruchase price for error. If ther's an error
   * the function will stop and will return that error.
   */
  if (typeof purchasePrice === "string") return purchasePrice;

  let purcahseLineItem = ""; // we setup an accumulator for the line of items as a string.

  // Line of code to get the entrant type and format it with the first letter capitalized.
  let entrantType =
    purchase.entrantType[0].toUpperCase() +
    purchase.entrantType.slice(1).toLowerCase();

  // Line of code to get the ticket type and format it with the first letter capitalized.
   let ticketType =
     purchase.ticketType[0].toUpperCase() +
     purchase.ticketType.slice(1).toLowerCase();
  
 // Update the purchase line item to include the ticket information that we already have using; entrant type, ticket type and price.
  purcahseLineItem += `${entrantType} ${ticketType} Admission: $${(purchasePrice / 100).toFixed(2)}`;
  
// Conditional statement to check if we have any extras.
    if (purchase.extras.length > 0) {
      // Creat a variable to set up an accumulator for the extras string.
      let extras = "";
      // we have to use a for ..... loop to loop trough the length of the extras Item.
      for (let x = 0; x < purchase.extras.length; x++) {

        // declaring an extra variable that equal to the incrementation of of extras.
        let extra = purchase.extras[x];
        extras += extra[0].toUpperCase() + extra.slice(1).toLowerCase() + "Access";

        // Code's line to check if we are not at the last item in the array, to add a coma , and a space
        if (x < purchase.extras.length - 1) {
          extras += ", ";
        }

        // adding the extras to the purchase line item. and also update the format to match: (Movies, Access, Terrace Access).
        purcahseLineItem += `(${extras})`;
      }
    }
      // Adding a line spacer to built the purchase line Item to have the format of the the expected ticket.
      purcahseLineItem += "\n";
    // code'sline to update the lineItems and the totalCost declaring ealier at the beginning of the fuction.
    lineItems += purcahseLineItem;
    totalCost += purchasePrice;

  
  }

  return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${lineItems}
  \n-------------------------------------------\nTOTAL: $${(totalCost / 100).toFixed(2)}`;


}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
