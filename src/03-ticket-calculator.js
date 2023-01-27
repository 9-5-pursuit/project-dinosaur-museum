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
    function calculateTicketPrice(ticketData, ticketInfo){
      let ticketPrice;
      
      if(ticketInfo.ticketType !== 'general' && ticketInfo.ticketType !== 'membership'){
          return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
      }
      
      if(ticketInfo.entrantType !== 'adult' && ticketInfo.entrantType !== 'child' && ticketInfo.entrantType !== 'senior'){
          return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
      }
      
      for(let i = 0; i < ticketInfo.extras.length; i++){
          if(ticketInfo.extras[i] !== 'movie' && ticketInfo.extras[i] !== 'education' && ticketInfo.extras[i] !== 'terrace'){
              return `Extra type '${ticketInfo.extras[i]}' cannot be found.`
          }
      }
      
      
      
      
      if(ticketInfo.ticketType === 'general'){
          if(ticketInfo.entrantType === 'adult'){
              ticketPrice = ticketData.general.priceInCents.adult;
          }
          if(ticketInfo.entrantType === 'child'){
              ticketPrice = ticketData.general.priceInCents.child;
          }
          if(ticketInfo.entrantType === 'senior'){
              ticketPrice = ticketData.general.priceInCents.senior;
          }
      }
      
      if(ticketInfo.ticketType === 'membership'){
          if(ticketInfo.entrantType === 'adult'){
              ticketPrice = ticketData.membership.priceInCents.adult;
          }
          if(ticketInfo.entrantType === 'child'){
              ticketPrice = ticketData.membership.priceInCents.child;
          }
          if(ticketInfo.entrantType === 'senior'){
              ticketPrice = ticketData.membership.priceInCents.senior;
          }
      }
      //adult
     if(ticketInfo.ticketType === 'general' || ticketInfo.ticketType === 'membership'){
         if(ticketInfo.entrantType === 'adult' && ticketInfo.extras.includes('movie')){
             ticketPrice += ticketData.extras.movie.priceInCents.adult;
         }
         if(ticketInfo.entrantType === 'adult' && ticketInfo.extras.includes('education')){
             ticketPrice += ticketData.extras.education.priceInCents.adult;
         }
         if(ticketInfo.entrantType === 'adult' && ticketInfo.extras.includes('terrace')){
             ticketPrice += ticketData.extras.terrace.priceInCents.adult;
         }
     }
     
     
     //child
        if(ticketInfo.ticketType === 'general' || ticketInfo.ticketType === 'membership'){
         if(ticketInfo.entrantType === 'child' && ticketInfo.extras.includes('movie')){
             ticketPrice += ticketData.extras.movie.priceInCents.child;
         }
         if(ticketInfo.entrantType === 'child' && ticketInfo.extras.includes('education')){
             ticketPrice += ticketData.extras.education.priceInCents.child;
         }
         if(ticketInfo.entrantType === 'child' && ticketInfo.extras.includes('terrace')){
             ticketPrice += ticketData.extras.terrace.priceInCents.child;
         }
     }
     
      //senior
           if(ticketInfo.ticketType === 'general' || ticketInfo.ticketType === 'membership'){
         if(ticketInfo.entrantType === 'senior' && ticketInfo.extras.includes('movie')){
             ticketPrice += ticketData.extras.movie.priceInCents.senior;
         }
         if(ticketInfo.entrantType === 'senior' && ticketInfo.extras.includes('education')){
             ticketPrice += ticketData.extras.education.priceInCents.senior;
         }
         if(ticketInfo.entrantType === 'senior' && ticketInfo.extras.includes('terrace')){
             ticketPrice += ticketData.extras.terrace.priceInCents.senior;
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
      let array1 = ["Thank you for visiting the Dinosaur Museum!\n-------------------------------------------"];
      
      let individualTicketTotal = 0;
      let totalTicketsAmount = 0;
      let formattedReceipt = '';
      
      for(let i = 0; i < purchases.length; i++){
          let array2 = [];
          
          // Entrant Edge Case
          if(purchases[i].entrantType !== 'child' && purchases[i].entrantType !== 'adult' && purchases[i].entrantType !== 'senior'){
        return   `Entrant type '${purchases[i].entrantType}' cannot be found.`
          }
          
          // Ticket Edge Case
          if(purchases[i].ticketType !== 'general' && purchases[i].ticketType !== 'membership' ){
        return `Ticket type '${purchases[i].ticketType}' cannot be found.`
          }
          
          // Extras Edge Case
          if(purchases[i].extras.includes("incorrect-extra")){
        return `Extra type 'incorrect-extra' cannot be found.`
          }
          
          individualTicketTotal = calculateTicketPrice(ticketData, purchases[i]);
          individualTicketTotal = (individualTicketTotal / 100);
          
          
          formattedReceipt = `\n${(purchases[i].entrantType[0].toUpperCase() + purchases[i].entrantType.slice(1)) + " " + (purchases[i].ticketType[0].toUpperCase() + purchases[i].ticketType.slice(1)) + ' Admission: ' + '$' + (individualTicketTotal) + '.00'}`
          
          array1.push(formattedReceipt)
          
          //Need to check for extras then put in seperate array for later use.
          for(let j = 0; j < purchases[i].extras.length; j++){
              if(purchases[i].extras[j] === "movie"){
          array2.push("Movie Access")
           } else if(purchases[i].extras[j] === "education"){
          array2.push("Education Access")
           } else if(purchases[i].extras[j] === "terrace"){
          array2.push("Terrace Access")
          }
       }
       
       // Check if array2 has any elements in it, if it does we push into array1, have to turn into a string by using join method.
       
          if(array2.length !== 0){
              array1.push(` (${array2.join(', ')})`);
          }
          
      totalTicketsAmount += individualTicketTotal;
      }
      
      
      array1.push(`\n-------------------------------------------\nTOTAL: $${totalTicketsAmount}.00`);
      
      return array1.join('');
  
      // return array1.toString();
  }

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
