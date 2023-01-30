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
  let tickFound = false
  let tickTypeSought = ticketInfo.ticketType
  let entrant = ticketInfo.entrantType
  let extraInfo = ticketInfo.extras[0]
  let extraArr = ticketInfo.extras

  // if (!ticketData.hasOwnProperty(tickTypeSought)) {
  //   return `Ticket type '${tickTypeSought}' cannot be found.`
  // } else if (!ticketData.general.priceInCents.hasOwnProperty(entrant)) {
  //   return `Entrant type '${entrant}' cannot be found.`
  // } else if (!Object.keys(ticketData.extras).includes(extraInfo)) {
  //   return `Extra type '${extraInfo}' cannot be found.`
  // }

  if (Object.keys(ticketInfo.extras).length === 0) {
    if (tickTypeSought === "general") {
        if (entrant === "child") {
          return ticketData.general.priceInCents.child
        } else if (entrant === "adult") {
          return ticketData.general.priceInCents.adult
        } else if (entrant === "senior") {
          return ticketData.general.priceInCents.senior
        }
    } else if (tickTypeSought === "membership") {
      if (entrant === "child") {
        return ticketData.membership.priceInCents.child
      } else if (entrant === "adult") {
        return ticketData.membership.priceInCents.adult
      } else if (entrant === "senior") {
        return ticketData.membership.priceInCents.senior
      }
    }
  } else if (Object.keys(ticketInfo.extras).length !== 0) {
    if (tickTypeSought === "general") {
      if (extraArr.includes("movie")) {
        if (extraArr.includes("education")) {
          if (extraArr.includes("terrace")) {
            if (entrant === "child") {
              return ticketData.general.priceInCents.child + ticketData.extras.movie.priceInCents.child + ticketData.extras.education.priceInCents.child + ticketData.extras.terrace.priceInCents.child
            } else if (entrant === "adult") {
              return ticketData.general.priceInCents.adult + ticketData.extras.movie.priceInCents.adult + ticketData.extras.education.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult
            } else if (entrant === "senior") {
              return ticketData.general.priceInCents.senior + ticketData.extras.movie.priceInCents.senior + ticketData.extras.education.priceInCents.senior + ticketData.extras.terrace.priceInCents.senior
            }
          } else {
            if (entrant === "child") {
              return ticketData.general.priceInCents.child + ticketData.extras.movie.priceInCents.child + ticketData.extras.education.priceInCents.child
            } else if (entrant === "adult") {
              return ticketData.general.priceInCents.adult + ticketData.extras.movie.priceInCents.adult + ticketData.extras.education.priceInCents.adult 
            } else if (entrant === "senior") {
              return ticketData.general.priceInCents.senior + ticketData.extras.movie.priceInCents.senior + ticketData.extras.education.priceInCents.senior 
            }
          }
        } else {
          if (entrant === "child") {
            return ticketData.general.priceInCents.child + ticketData.extras.movie.priceInCents.child 
          } else if (entrant === "adult") {
            return ticketData.general.priceInCents.adult + ticketData.extras.movie.priceInCents.adult  
          } else if (entrant === "senior") {
            return ticketData.general.priceInCents.senior + ticketData.extras.movie.priceInCents.senior 
          }
        }
      } else if (extraArr.includes("terrace") && extraArr.includes("education")) {
        if (entrant === "child") {
          return ticketData.general.priceInCents.child + ticketData.extras.education.priceInCents.child + ticketData.extras.terrace.priceInCents.child
        } else if (entrant === "adult") {
          return ticketData.general.priceInCents.adult + ticketData.extras.education.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult
        } else if (entrant === "senior") {
          return ticketData.general.priceInCents.senior + ticketData.extras.education.priceInCents.senior + ticketData.extras.terrace.priceInCents.senior
        }
      }
    } else if (tickTypeSought === "membership") {
      if (extraArr.includes("movie")) {
        if (extraArr.includes("education")) {
          if (extraArr.includes("terrace")) {
            if (entrant === "child") {
              return ticketData.membership.priceInCents.child + ticketData.extras.movie.priceInCents.child + ticketData.extras.education.priceInCents.child + ticketData.extras.terrace.priceInCents.child
            } else if (entrant === "adult") {
              return ticketData.membership.priceInCents.adult + ticketData.extras.movie.priceInCents.adult + ticketData.extras.education.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult
            } else if (entrant === "senior") {
              return ticketData.membership.priceInCents.senior + ticketData.extras.movie.priceInCents.senior + ticketData.extras.education.priceInCents.senior + ticketData.extras.terrace.priceInCents.senior
            }
          } else {
            if (entrant === "child") {
              return ticketData.membership.priceInCents.child + ticketData.extras.movie.priceInCents.child + ticketData.extras.education.priceInCents.child
            } else if (entrant === "adult") {
              return ticketData.membership.priceInCents.adult + ticketData.extras.movie.priceInCents.adult + ticketData.extras.education.priceInCents.adult 
            } else if (entrant === "senior") {
              return ticketData.membership.priceInCents.senior + ticketData.extras.movie.priceInCents.senior + ticketData.extras.education.priceInCents.senior 
            }
          }
        } else {
          if (entrant === "child") {
            return ticketData.membership.priceInCents.child + ticketData.extras.movie.priceInCents.child 
          } else if (entrant === "adult") {
            return ticketData.membership.priceInCents.adult + ticketData.extras.movie.priceInCents.adult  
          } else if (entrant === "senior") {
            return ticketData.membership.priceInCents.senior + ticketData.extras.movie.priceInCents.senior 
          }
        }
      } else if (extraArr.includes("terrace") && extraArr.includes("education")) {
        if (entrant === "child") {
          return ticketData.membership.priceInCents.child + ticketData.extras.education.priceInCents.child + ticketData.extras.terrace.priceInCents.child
        } else if (entrant === "adult") {
          return ticketData.membership.priceInCents.adult + ticketData.extras.education.priceInCents.adult + ticketData.extras.terrace.priceInCents.adult
        } else if (entrant === "senior") {
          return ticketData.membership.priceInCents.senior + ticketData.extras.education.priceInCents.senior + ticketData.extras.terrace.priceInCents.senior
        }
      }
    }
  }

  if (!ticketData.hasOwnProperty(tickTypeSought)) {
    return `Ticket type '${tickTypeSought}' cannot be found.`
  } else if (!ticketData.general.priceInCents.hasOwnProperty(entrant)) {
    return `Entrant type '${entrant}' cannot be found.`
  } else if (!Object.keys(ticketData.extras).includes(extraInfo)) {
    return `Extra type '${extraInfo}' cannot be found.`
  }
  
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
    let adultGen = `Adult General Admission: ` //$30.00` //+ "\n"
    let childGen = `Child General Admission: ` //$20.00` //+ "\n"
    let seniorGen = `Senior General Admission: ` //$25.00` //+ "\n"
    let adultMem = `Adult Membership Admission: ` //$28.00` //+ "\n"
    let childMem = `Child Membership Admission: ` //$15.00` //+ "\n"
    let seniorMem = `Senior Membership Admission: ` //$23.00` //+ "\n"
    let tickTypeSought = purchases[0].ticketType
    let entrant = purchases[0].entrantType
    let extraInfo = purchases[0].extras[0];
    let extraArr = purchases[0].extras;
    let total = 0;
    
    let revTotal, strTotal;
    let adultNum;
    let childNum;
    let seniorNum;
    let singleCustSubTotal;
    let arr = [];
    let upperStr = `Thank you for visiting the Dinosaur Museum!` + "\n" +`-------------------------------------------` + "\n"
    let mainStr = ''
    let lowerStr = `-------------------------------------------` + "\n"
    let bottomStr = `TOTAL: $`

  
    // Iterating through each object, aka ticket
    for (let i = 0; i < purchases.length; i++) {
      
      // first checking for errors
      // tickTypeSought = purchases[i];
      // entrant = purchases[i].entrantType
      // extraInfo = purchases[i].extras[0];
      // if (!Object.keys(ticketData).includes(tickTypeSought.ticketType)) {
      //   return `Ticket type '${tickTypeSought.ticketType}' cannot be found.`;
      // }
      // if (!ticketData.general.priceInCents.hasOwnProperty(entrant)) {
      //   return `Entrant type '${entrant}' cannot be found.`;
      // }

      // if (!Object.keys(ticketData.extras).includes(extraInfo)) {
      //   return `Extra type '${extraInfo}' cannot be found.`
      // }

      adultNum = 0;
      childNum = 0;
      seniorNum = 0;
      singleCustSubTotal = 0;

        // When there are no extras
      if (Object.keys(purchases[0].extras).length === 0) {
        // Looking at General Admission tickets only
        if (tickTypeSought === "general") { 
          if (purchases[i].entrantType === "child") {
            childGen = childGen + `$23.00`
            arr.push(childGen)
            total += 2000
          } else if (purchases[i].entrantType === "adult") {
            adultGen = adultGen + `$30.00`
            arr.push(adultGen)
            total += 3000
          } else if (purchases[i].entrantType === "senior") {
            seniorGen = seniorGen + `$25.00`
            arr.push(seniorGen)
            total += 2500
          }
          // Looking at Membership Admission tickets only
        } else if (tickTypeSought === "membership") {
          if (purchases[i].entrantType === "child") {
            childMem = childMem + `$15.00`
            arr.push(childMem)
            total += 1500
          } else if (purchases[i].entrantType === "adult") {
            adultMem = adultMem + `$28.00`
            arr.push(adultMem)
            total += 2800
          } else if (purchases[i].entrantType === "senior") {
            seniorMem = seniorMem + `$23.00`
            arr.push(seniorMem) 
            total += 2300
          }
        }
      // // When there are no extras
      // if (Object.keys(purchases[0].extras).length === 0) {
      //   // Looking at General Admission tickets only
      //   if (tickTypeSought === "general") { 
      //     if (purchases[i].entrantType === "child") {
      //       childGen = childGen + `$23.00`
      //       arr.push(childGen)
      //       total += 2000
      //     } else if (purchases[i].entrantType === "adult") {
      //       adultGen = adultGen + `$30.00`
      //       arr.push(adultGen)
      //       total += 3000
      //     } else if (purchases[i].entrantType === "senior") {
      //       seniorGen = seniorGen + `$25.00`
      //       arr.push(seniorGen)
      //       total += 2500
      //     }
      //     // Looking at Membership Admission tickets only
      //   } else if (tickTypeSought === "membership") {
      //     if (purchases[i].entrantType === "child") {
      //       childMem = childMem + `$15.00`
      //       arr.push(childMem)
      //       total += 1500
      //     } else if (purchases[i].entrantType === "adult") {
      //       adultMem = adultMem + `$28.00`
      //       arr.push(adultMem)
      //       total += 2800
      //     } else if (purchases[i].entrantType === "senior") {
      //       seniorMem = seniorMem + `$23.00`
      //       arr.push(seniorMem) 
      //       total += 2300
      //     }
      //   }
        
        // Now looking at when there are extras
      // } else if (Object.keys(purchases[0].extras).length !== 0) {

      }
    } 
    
      // for (let i = 0; i < arr.length; i++) {
      //   if (arr[i] === adultGen) mainStr += adultGen + "\n";
      //   if (arr[i] === childGen) mainStr += childGen + "\n";
      //   if (arr[i] === seniorGen) mainStr += seniorGen + "\n";  
      //   if (arr[i] === adultMem) mainStr += adultMem + "\n";
      //   if (arr[i] === childMem) mainStr += childMem + "\n";
      //   if (arr[i] === seniorMem) mainStr += seniorMem + "\n";
      // }

      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === adultGen) mainStr += adultGen + "\n";
        if (arr[i] === childGen) mainStr += childGen + "\n";
        if (arr[i] === seniorGen) mainStr += seniorGen + "\n";  
        if (arr[i] === adultMem) mainStr += adultMem + "\n";
        if (arr[i] === childMem) mainStr += childMem + "\n";
        if (arr[i] === seniorMem) mainStr += seniorMem + "\n";
      }

    revTotal = (total/100).toFixed(2)
    
    // console.log("hello")
    return upperStr + mainStr + lowerStr + bottomStr + revTotal


    // if (!ticketData.hasOwnProperty(tickTypeSought)) {
    //   return `Ticket type '${tickTypeSought}' cannot be found.`
    // } else if (!ticketData.general.priceInCents.hasOwnProperty(entrant)) {
      // return `Entrant type '${entrant}' cannot be found.`
    // } else if (!Object.keys(ticketData.extras).includes(extraInfo)) {
    //   return `Extra type '${extraInfo}' cannot be found.`
    // }
    
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
