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
  let ticketPrice = 0;

  let type = ticketInfo.ticketType
  let entrant = ticketInfo.entrantType
  let tExtras = ticketInfo.extras

  // checking if ticketData holds the type and entrant given in ticketInfo
  if (ticketData[type] !== undefined && ticketData[type] !== "extras") {
    if (Object.keys(ticketData[type]["priceInCents"]).includes(entrant)) {
      ticketPrice += ticketData[type]["priceInCents"][entrant];
    } else {
      return `Entrant type '${entrant}' cannot be found.`;
    }
  } else {
    return `Ticket type '${type}' cannot be found.`;
  } 
  //tExtras is the extras array of the ticketInfo, as opposed to the extras in ticketData
  if (tExtras.length !== 0) {
    for (const extra of tExtras) {
      if (Object.keys(ticketData.extras).includes(extra)) {
        ticketPrice += ticketData.extras[extra].priceInCents[entrant];
      } else {
        return `Extra type '${extra}' cannot be found.`;
      }
    }
  }

  return ticketPrice;
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
  const purchaseObjects = [];

  for (const purchase of purchases) {
    let purchaseObj = {
      price : 0,
      entrantTypeF : '',
      ticketTypeF : '',
      extrasDesc : []
    }

    if (typeof calculateTicketPrice(ticketData, purchase) === "number") {
      purchaseObj.price += calculateTicketPrice(ticketData, purchase);
    } else {
      return calculateTicketPrice(ticketData, purchase);
    }

    // first letter of entrant capitalized
    entArr = purchase.entrantType.split('');
    entArr[0] = entArr[0].toUpperCase();
    formattedEnt = entArr.join('');

    // ticketTypeF is ticket type descriptions
    purchaseObj.entrantTypeF = formattedEnt;
    purchaseObj.ticketTypeF = ticketData[purchase.ticketType].description;
    if (purchase.extras.length !== 0) {
      for (const extra of purchase.extras) {
        purchaseObj.extrasDesc.push(ticketData.extras[extra].description);
      }
    }
    
    purchaseObjects.push(purchaseObj);
  }

  let receiptString = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------`;

  let totalPrice = 0;

  for (const p of purchaseObjects) {
    let formattedPrice = p.price / 100;

    formattedPrice = Number(formattedPrice.toFixed(2));

    // added a case for if the numbers are decimals even though all the prices currently evaluate to integers
    if (formattedPrice % 1 !== 0) {
      totalPrice += formattedPrice;
    } else {
      totalPrice += formattedPrice;
      formattedPrice = String(formattedPrice) + '.00';
    }

    if (p.extrasDesc.length !== 0) {
      if (p.extrasDesc.length > 1) {
        receiptString += `\n${p.entrantTypeF} ${p.ticketTypeF}: $${formattedPrice} (${p.extrasDesc.join(', ')})`;
      } else {
        receiptString += `\n${p.entrantTypeF} ${p.ticketTypeF}: $${formattedPrice} (${p.extrasDesc[0]})`;
      }
    } else {
      receiptString += `\n${p.entrantTypeF} ${p.ticketTypeF}: $${formattedPrice}`;
    }
  }

  if (totalPrice % 1 !== 0) {
    receiptString += `\n-------------------------------------------\nTOTAL: $${totalPrice}`;
  } else {
    receiptString += `\n-------------------------------------------\nTOTAL: $${totalPrice}.00`;
  }

  return receiptString;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
