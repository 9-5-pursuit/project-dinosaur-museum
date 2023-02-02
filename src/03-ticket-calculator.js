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
  let cost = 0;
  //if ticketInfo.entrantType cant be found
  if (ticketInfo.entrantType !== "child" && ticketInfo.entrantType !== "adult" && ticketInfo.entrantType !== "senior") {
    cost = `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  }
  //child
  if (ticketInfo.entrantType === "child") {
    //if membership
    if (ticketInfo.ticketType === "membership") {
      cost = ticketData.membership.priceInCents.child; 
      //extras
      //make it a loop
      for (let i = 0; i < ticketInfo.extras.length; i++) {
      if (ticketInfo.extras[i] !== "movie" && ticketInfo.extras[i] !== "education" && ticketInfo.extras[i] !== "terrace") {
       cost = `Extra type '${ticketInfo.extras[i]}' cannot be found.`
      } else if (ticketInfo.extras[i] === "movie") {
       cost += ticketData.extras.movie.priceInCents.child;
      } else if (ticketInfo.extras[i] === "education") {
       cost += ticketData.extras.education.priceInCents.child;
      } else if (ticketInfo.extras[i] === "terrace") {
       cost += ticketData.extras.terrace.priceInCents.child;
      }
     }
   } else if (ticketInfo.ticketType === "general") {
      cost = ticketData.general.priceInCents.child; 
      //extras
      //make it a loop
      for (let i = 0; i < ticketInfo.extras.length; i++) {
      if (ticketInfo.extras[i] !== "movie" && ticketInfo.extras[i] !== "education" && ticketInfo.extras[i] !== "terrace") {
       cost = `Extra type '${ticketInfo.extras[i]}' cannot be found.`
      } else if (ticketInfo.extras[i] === "movie") {
       cost += ticketData.extras.movie.priceInCents.child;
      } else if (ticketInfo.extras[i] === "education") {
       cost += ticketData.extras.education.priceInCents.child;
      } else if (ticketInfo.extras[i] === "terrace") {
       cost += ticketData.extras.terrace.priceInCents.child;
      }
     }
   } else {
    cost = `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  }
  }
  //adult
  if (ticketInfo.entrantType === "adult") {
    //if membership
    if (ticketInfo.ticketType === "membership") {
      cost = ticketData.membership.priceInCents.adult;
      //extras
      //make it a loop
      for (let i = 0; i < ticketInfo.extras.length; i++) {
      if (ticketInfo.extras[i] !== "movie" && ticketInfo.extras[i] !== "education" && ticketInfo.extras[i] !== "terrace") {
       cost = `Extra type '${ticketInfo.extras[i]}' cannot be found.`
      } else if (ticketInfo.extras[i] === "movie") {
       cost += ticketData.extras.movie.priceInCents.adult;
      } else if (ticketInfo.extras[i] === "education") {
       cost += ticketData.extras.education.priceInCents.adult;
      } else if (ticketInfo.extras[i] === "terrace") {
       cost += ticketData.extras.terrace.priceInCents.adult;
      }
     }
   } else if (ticketInfo.ticketType === "general") {
      cost = ticketData.general.priceInCents.adult;
      //extras
      //make it a loop
      for (let i = 0; i < ticketInfo.extras.length; i++) {
      if (ticketInfo.extras[i] !== "movie" && ticketInfo.extras[i] !== "education" && ticketInfo.extras[i] !== "terrace") {
       cost = `Extra type '${ticketInfo.extras[i]}' cannot be found.`
      } else if (ticketInfo.extras[i] === "movie") {
       cost += ticketData.extras.movie.priceInCents.adult;
      } else if (ticketInfo.extras[i] === "education") {
       cost += ticketData.extras.education.priceInCents.adult;
      } else if (ticketInfo.extras[i] === "terrace") {
       cost += ticketData.extras.terrace.priceInCents.adult;
      }
     }
   } else {
    cost = `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  }
  }
  //senior
  if (ticketInfo.entrantType === "senior") {
    //if membership
    if (ticketInfo.ticketType === "membership") {
      cost = ticketData.membership.priceInCents.senior;
      //extras
      //make it a loop
      for (let i = 0; i < ticketInfo.extras.length; i++) {
      if (ticketInfo.extras[i] !== "movie" && ticketInfo.extras[i] !== "education" && ticketInfo.extras[i] !== "terrace") {
       cost = `Extra type '${ticketInfo.extras[i]}' cannot be found.`
      } else if (ticketInfo.extras[i] === "movie") {
       cost += ticketData.extras.movie.priceInCents.senior
      } else if (ticketInfo.extras[i] === "education") {
       cost += ticketData.extras.education.priceInCents.senior
      } else if (ticketInfo.extras[i] === "terrace") {
       cost += ticketData.extras.terrace.priceInCents.senior
      }
     }
   } else if (ticketInfo.ticketType === "general") {
      cost = ticketData.general.priceInCents.senior;
       //extras
       //make it a loop
       for (let i = 0; i < ticketInfo.extras.length; i++) {
       if (ticketInfo.extras[i] !== "movie" && ticketInfo.extras[i] !== "education" && ticketInfo.extras[i] !== "terrace") {
        cost = `Extra type '${ticketInfo.extras[i]}' cannot be found.`
       } else if (ticketInfo.extras[i] === "movie") {
        cost += ticketData.extras.movie.priceInCents.senior
       } else if (ticketInfo.extras[i] === "education") {
        cost += ticketData.extras.education.priceInCents.senior
       } else if (ticketInfo.extras[i] === "terrace") {
        cost += ticketData.extras.terrace.priceInCents.senior
       }
      }
    } else {
      cost = `Ticket type '${ticketInfo.ticketType}' cannot be found.`
    }
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
function purchaseTickets(ticketData, purchases) {
  let totalCost = 0;
  let ticketList = "";
  for (let i = 0; i < purchases.length; i++) {
    let purchaseCost = calculateTicketPrice(ticketData, purchases[i]) 
    if (typeof purchaseCost === "string") {
      return purchaseCost;
    } else {
      totalCost += purchaseCost;
    if (purchases[i][extras].length > 0){
      let extras = []
    for (j = 0; j < purchases[i].extras.length; i++) {
      let extra = purchases[i].extras[j];
      let splitExtra = extra.split("");
      let capitalizedExtra0 = splitExtra[0].toUpperCase();
      splitExtra.shift();
      splitExtra.unshift(capitalizedExtra0);
      extra = splitExtra.join("")
      extras.push(extra + " Access");
      extras.push(")");
      extras.unshift("(")
      extras = extras.join(`, `)
    } 
  }
    let entrantType = purchases[i].entrantType;
    let splitEntrant = entrantType.split("");
    let capitalizedEntrant0 = splitEntrant[0].toUpperCase();
    splitEntrant.shift();
    splitEntrant.unshift(capitalizedEntrant0);
    entrantType = splitEntrant.join("")
    let ticketType = purchases[i].ticketType;
    let splitTicket = ticketType.split("");
    let capitalizedTicket0 = splitTicket[0].toUpperCase();
    splitTicket.shift();
    splitTicket.unshift(capitalizedTicket0)
    ticketType = splitTicket.join("")
    let ticketListItem = `${entrantType} ${ticketType} Admission: $${(purchaseCost / 100).toFixed(2)} (${extras})\n`
    ticketList += ticketListItem;
  }
  }
  let result = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${ticketList}-------------------------------------------\nTOTAL: $${(totalCost / 100).toFixed(2)}`
  return result; 
}





// let lineItems = "";
//   let totalCost = 0;

//   for (let purchase of purchases) {
//     let purchaseCost = calculateTicketPrice(ticketData, purchase);
//     if (typeof purchaseCost === "string") {
//      return purchaseCost;
//    }
//     totalCost += purchaseCost;
//     let purchaseLineItem = "";
//     let entrantType = purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1);
//     let ticketType = purchase.ticketType[0].toUpperCase() + purchase.ticketType.slice(1);
//     purchaseLineItem += `${entrantType} ${ticketType} Admission: $${(purchaseCost / 100).toFixed(2)}`
//     if (purchase.extras.length > 0) {
//       let (let i = 0; i < purchase.extras.length; i++) {
//         let extras = ""
//         let extra = purchase.extras[i]
//         extras += extra[0].toUpperCase() + extra.splice(1).toLowerCase() + " Access"
//         if (i < purchase[i].extras.length - 1) {
        
//         }
//       }
//     }
// }

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
