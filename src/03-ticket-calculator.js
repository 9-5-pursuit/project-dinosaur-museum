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

    var a = ticketInfo.ticketType
    var b = ticketInfo.entrantType
    var c = ticketInfo.extras
    
    if (!['child','adult','senior'].includes(b)) return `Entrant type '${b}' cannot be found.`
    if(!['general','membership'].includes(a)) return `Ticket type '${a}' cannot be found.`
    if (c.length) {
      var cf = c.filter(item => !['movie','education','terrace'].includes(item))
      if (cf.length) return `Extra type '${cf[0]}' cannot be found.`
  }
      var ip = ticketData[a].priceInCents[b]
      var rp = 0

      for (var e of c) {
        rp += ticketData.extras[e].priceInCents[b]
      }
      return rp+ip
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

    var cf = purchases.filter(item => !['general','membership'].includes(item.ticketType))
    if (cf.length) return `Ticket type '${cf[0].ticketType}' cannot be found.`

    var ef = purchases.filter(item => !['child','adult','senior'].includes(item.entrantType))
    if (ef.length) return `Entrant type '${ef[0].entrantType}' cannot be found.`

    for (var em of purchases) {
      if (em.extras.length) {
        var vf = em.extras.filter(item => !['movie','education','terrace'].includes(item))
        if (vf.length) return `Extra type '${vf[0]}' cannot be found.`
      }
    }

    var res = 0
    var rstring = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------`
    for (var tm of purchases) {

      var a = tm.ticketType
      var b = tm.entrantType
      var c = tm.extras

      var ip = ticketData[a].priceInCents[b]
      var rp = 0
      for (var e of c) {
        rp += ticketData.extras[e].priceInCents[b]
      }
      res += rp+ip
      if (tm.extras.length) var ts = ` (${tm.extras.map(item => {return item[0].toUpperCase()+item.substring(1)+' Access'}).join(', ')})`
      rstring += `\n${tm.entrantType[0].toUpperCase()+tm.entrantType.substring(1)} ${tm.ticketType[0].toUpperCase()+tm.ticketType.substring(1)} Admission: $${((rp+ip)/100).toFixed(2)}${ts??''}` 
    }
    return rstring + `\n-------------------------------------------\nTOTAL: $${(res/100).toFixed(2)}`
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
