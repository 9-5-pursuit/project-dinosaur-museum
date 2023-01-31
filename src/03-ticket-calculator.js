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

/* --------------------- RETURN TICKET PRICE -----------------------
- 1. created var for accumulator of total
- 2. if statement
      - if ticketData param does not have the same prop as ticketInfo param return ticket type cant be found error msg
      - else if ticketdata param doesnt have ticket info ticket type price in cents as an entrant type fpr ticketinfo return error for entrant
- 3. start for in loop
      - for tickets in ticket data
      - if ticket from at position of loop in ticket data equals ticket info ticket type then total equals price in cent for that entrant type
- 4. if extras array in ticket info equals 0 then return total
- 5. started a for loop for extras array
    - created var for extras which equal ticket info .extras at index
    - if statement
      - if extras from ticket data does not have extras at index then return extra eroor msg
    - created a nested for in loop to loop thru extra price in extra array
    - if extra price equals extra then total plus extras price in cent for entrant
- 6. return total

*/ 
function calculateTicketPrice(ticketData, ticketInfo) {

  let total;

  if (!ticketData.hasOwnProperty(ticketInfo.ticketType)) {

    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`

  } else if (!(ticketData[ticketInfo.ticketType].priceInCents).hasOwnProperty(ticketInfo.entrantType)) {

    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  }

  for (let ticket in ticketData) {
    
    if (ticket === ticketInfo.ticketType) {
      
      total = ticketData[ticket].priceInCents[ticketInfo.entrantType];

    }
  }

  if (ticketInfo.extras.length === 0) {

    return total;

  }

  for (let i = 0; i < ticketInfo.extras.length; i++) {

    let extra = ticketInfo.extras[i];

    if (!ticketData.extras.hasOwnProperty(extra)) {

      return `Extra type '${extra}' cannot be found.`;

    }

    for (let extraPrice in ticketData.extras) {

      if (extraPrice === extra) {
        
        total += ticketData.extras[extraPrice].priceInCents[ticketInfo.entrantType];

      }
    }

  }
  
  return total;

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

/* ---------- TICKET RECEIPT -----------
- 1. created a var for ticket pruchase to reassign later
- 2. created reciept for top of receipt with back ticks to skip lines
- 3. started an acc. for total
- 4. created var for cost of ticket to assign my previous function to
- 5. created a for loop to start at index i; as long as i is less than purchases param which is an array
    - assigned ticket purch var to purchases at index i
    - assigned my previous function to cost of ticket param
    - created an if statement
      - if cost of ticket is not number return function output
    - divided my cost of ticket  by 100 to convert into dollars
    - reassigned my total tototal plus cost of ticket
    - if statement
      -if ticket purchase extras array is empty then receipt plus equals temp lit
        - ticket purchase entrant type at index 0 to uppercase plus the rest of the letter using substring starting at index 1 plus desc and total with 2 dec. using tofixed method
        - else return the smae methid as the last
        - created a for loop within that statement for extras and added to receipt var the same way as previous
        - else return using the same method
- 6. created a var for a divider in the receipt and added divider to receipt var and total string with tofixed method then returned receipt

*/
function purchaseTickets(ticketData, purchases) {

  let ticketPurchase;

  let receipt = `Thank you for visiting the Dinosaur Museum!
-------------------------------------------
`
;

  let total = 0;
  let costOfTicket;

  for (let i = 0; i < purchases.length; i++) {

    ticketPurchase = purchases[i];

    costOfTicket = calculateTicketPrice(ticketData, ticketPurchase);

    if (typeof costOfTicket !== "number") {

      return costOfTicket;

    }

    costOfTicket /= 100;

    total += costOfTicket;

    if (ticketPurchase.extras.length === 0) {

      receipt += `${ticketPurchase.entrantType[0].toUpperCase() + ticketPurchase.entrantType.substring(1)} ${ticketData[ticketPurchase.ticketType].description}: $${costOfTicket.toFixed(2)}
`;

    } else {

      receipt += `${ticketPurchase.entrantType[0].toUpperCase() + ticketPurchase.entrantType.substring(1)} ${ticketData[ticketPurchase.ticketType].description}: $${costOfTicket.toFixed(2)} (`;

      for (let j = 0; j < purchases[i].extras.length; j++) {

        if (j !== purchases[i].extras.length - 1) {
          receipt += `${purchases[i].extras[j][0].toUpperCase()}${purchases[i].extras[j].substring(1)} Access, `;

        } else {

          receipt += `${purchases[i].extras[j][0].toUpperCase()}${purchases[i].extras[j].substring(1)} Access)
`;

        }
      }
    }
  }

  let divider =  `-------------------------------------------
`;

  receipt += divider;
  receipt += `TOTAL: $${total.toFixed(2)}`;

  return receipt;

}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
